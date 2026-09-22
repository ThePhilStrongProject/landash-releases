/*
 * Restoring a LANDA.SH backup over USB, in the browser.
 *
 * The conversation is the one the firmware documents in main/ui/usb_restore.h
 * (source repository): announce the size, wait for READY, send the passphrase
 * line and the .landash file no more than WINDOW bytes ahead of the dongle's
 * ACKs, then read OK or ERR, and after the restart the dongle's new address.
 *
 * Only Web Serial's own surface is used - port.open(), port.readable,
 * port.writable - so the same code runs against a real port in Node for
 * testing. Loaded as a plain script it defines window.LandashRestore.
 */
(function (root) {
"use strict";

var WINDOW = 3072;          /* bytes allowed beyond the last ACK            */
var READY_WAIT_MS = 60000;  /* a dongle straight off the installer boots    */
var RESEND_MS = 1500;       /* ...so the command is repeated until answered */
var ACK_WAIT_MS = 30000;    /* covers the several seconds of key derivation */
var IP_WAIT_MS = 90000;

var enc = new TextEncoder();

/* What the dashboard can read without the passphrase. Null when it is not a backup. */
function readHeader(bytes) {
  if (bytes.length < 10) return null;
  for (var i = 0; i < 8; i++) if (bytes[i] !== "LANDASH\n".charCodeAt(i)) return null;
  var len = bytes[8] | (bytes[9] << 8);
  if (len < 1 || len > 1024 || bytes.length < 10 + len) return null;
  try { return JSON.parse(new TextDecoder().decode(bytes.subarray(10, 10 + len))); }
  catch (e) { return null; }
}

function passphraseOk(p) {
  return typeof p === "string" && p.length >= 8 && p.length <= 128 && !/[\x00-\x1f\x7f]/.test(p);
}

/* The console interleaves our lines with the log; keep only ours. */
function Link(port) {
  this.reader = port.readable.getReader();
  this.writer = port.writable.getWriter();
  this.dec = new TextDecoder();
  this.buf = "";
  this.queue = [];
  this.waiter = null;
  this.closed = false;
  this.pump();
}
Link.prototype.pump = function () {
  var self = this;
  self.reader.read().then(function (r) {
    if (r.done) { self.end(); return; }
    self.buf += self.dec.decode(r.value, {stream: true});
    var i;
    while ((i = self.buf.indexOf("\n")) >= 0) {
      var line = self.buf.slice(0, i).replace(/\x1b\[[0-9;]*m/g, "").trim();
      self.buf = self.buf.slice(i + 1);
      if (line.indexOf("LANDASH:") === 0) {
        var body = line.slice(8), sp = body.indexOf(" ");
        self.push({kind: sp < 0 ? body : body.slice(0, sp), rest: sp < 0 ? "" : body.slice(sp + 1)});
      }
    }
    self.pump();
  }, function () { self.end(); });
};
Link.prototype.end = function () { this.closed = true; this.push(null); };
Link.prototype.push = function (item) {
  if (this.waiter) { var w = this.waiter; this.waiter = null; w(item); }
  else this.queue.push(item);
};
/* The next line of ours; undefined on a timeout, null once the port has gone. */
Link.prototype.next = function (ms) {
  var self = this;
  if (self.queue.length) return Promise.resolve(self.queue.shift());
  if (self.closed) return Promise.resolve(null);
  return new Promise(function (resolve) {
    var t = setTimeout(function () { self.waiter = null; resolve(undefined); }, Math.max(0, ms));
    self.waiter = function (item) { clearTimeout(t); resolve(item); };
  });
};
Link.prototype.write = function (bytes) { return this.writer.write(bytes); };
Link.prototype.release = function () {
  var self = this;
  return self.reader.cancel().catch(function () {}).then(function () {
    try { self.reader.releaseLock(); } catch (e) {}
    try { self.writer.releaseLock(); } catch (e) {}
  });
};

function fail(message, status) {
  var e = new Error(message);
  e.status = status || 0;
  return e;
}

/* "403 Wrong passphrase." -> an Error with .status 403 */
function refusal(rest) {
  var m = /^(\d{3})\s*(.*)$/.exec(rest);
  return m ? fail(m[2] || "The dongle refused the backup.", Number(m[1]))
           : fail(rest || "The dongle refused the backup.");
}

/*
 * Sends one backup. port must be closed; it is opened here and closed again
 * before the promise settles. progress(stage, fraction) reports:
 *   "waiting"  for the dongle to answer
 *   "checking" the passphrase (the dongle derives the key)
 *   "sending"  fraction 0..1
 *   "restarting", then "online" with fraction = the address, or "offline"
 * Resolves with {result, ip}; ip is "" when no address came back in time.
 */
function restoreOverSerial(port, bytes, passphrase, progress) {
  progress = progress || function () {};
  if (!passphraseOk(passphrase)) {
    return Promise.reject(fail("The passphrase must be 8 to 128 characters, with no line breaks."));
  }
  var head = enc.encode(passphrase + "\n");
  var body = new Uint8Array(head.length + bytes.length);
  body.set(head, 0);
  body.set(bytes, head.length);
  var cmd = enc.encode("\nLANDASH-RESTORE " + body.length + "\n");
  var link = null, result = null;

  function awaitReady() {
    var deadline = Date.now() + READY_WAIT_MS;
    function round() {
      if (Date.now() > deadline) {
        return Promise.reject(fail("The dongle didn't answer. It needs LANDA.SH v0.20.0 or later: install it above first, then try again."));
      }
      return link.write(cmd).then(function () { return listen(Date.now() + RESEND_MS); });
    }
    function listen(until) {
      return link.next(until - Date.now()).then(function (l) {
        if (l === null) throw fail("The dongle was unplugged.");
        if (l === undefined) return round();
        if (l.kind === "READY") return;
        if (l.kind === "ERR") throw refusal(l.rest);
        return listen(until);
      });
    }
    return round();
  }

  function send() {
    var sent = 0, acked = 0;
    function step() {
      var p = Promise.resolve();
      if (sent < body.length && sent - acked < WINDOW) {
        var n = Math.min(WINDOW - (sent - acked), body.length - sent);
        var chunk = body.subarray(sent, sent + n);
        sent += n;
        p = link.write(chunk);
      }
      return p.then(function () { return link.next(ACK_WAIT_MS); }).then(function (l) {
        if (l === null) throw fail("The dongle was unplugged.");
        if (l === undefined) throw fail("The dongle stopped answering part-way.");
        if (l.kind === "ACK") {
          acked = parseInt(l.rest, 10) || acked;
          progress(acked < 2048 && sent < body.length ? "checking" : "sending", acked / body.length);
          return step();
        }
        if (l.kind === "OK") { result = JSON.parse(l.rest); return; }
        if (l.kind === "ERR") throw refusal(l.rest);
        return step();
      });
    }
    progress("checking", 0);
    return step();
  }

  function awaitAddress() {
    progress("restarting");
    var until = Date.now() + IP_WAIT_MS;
    function listen() {
      return link.next(until - Date.now()).then(function (l) {
        if (!l) return "";                  /* timed out, or the port went */
        if (l.kind === "IP") return l.rest;
        return listen();
      });
    }
    return listen();
  }

  function finish(err) {
    var done = link ? link.release() : Promise.resolve();
    return done.then(function () { return port.close().catch(function () {}); })
      .then(function () { if (err) throw err; });
  }

  progress("waiting");
  return port.open({baudRate: 115200}).catch(function (e) {
    if (e && e.name === "InvalidStateError") {
      throw fail("Something else still has the dongle open. Close the installer's window, then try again.");
    }
    throw fail("Couldn't open the dongle's USB port: " + (e && e.message ? e.message : e));
  }).then(function () {
    link = new Link(port);
    return awaitReady();
  }).then(send).then(awaitAddress).then(function (ip) {
    progress(ip ? "online" : "offline", ip);
    return finish().then(function () { return {result: result, ip: ip}; });
  }, function (err) {
    return finish(err);
  });
}

var api = {readHeader: readHeader, passphraseOk: passphraseOk, restoreOverSerial: restoreOverSerial};
root.LandashRestore = api;
if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
