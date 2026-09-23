# Changelog

Newest first. Each version's image is in [`firmware/`](firmware).

## v0.22.1 (2026-09-23)

A quieter, proper Matrix theme. Phosphor green on black in a terminal typeface, with a faint digital rain falling behind the page - switch it off for your browser in Settings › Appearance, and it stays still if your system asks for reduced motion. Headings sit behind a > prompt, the logo has a blinking cursor and decodes itself when you hover it, and hovering a button, row or tile flips it to inverse video. Offline and failed still show in red, so problems stand out.

## v0.22.0 (2026-09-23)

A proper Cyberpunk theme. Neon on pitch black: cyan for anything you can press, hot magenta for alerts, gold for badges and warnings, terminal green for what is online, with glowing headings, a faint tactical grid, CRT scanlines and chamfered, cut-corner panels with HUD crosshairs. Everything is set in Share Tech Mono with Orbitron headings and clock; both fonts are built into the dongle, so the theme looks the same with no internet, and the other themes never download them. Hover the logo for a glitch; it stays still if your system asks for reduced motion. Pick it in Settings › Appearance.

## v0.21.2 (2026-09-23)

A calmer dashboard. The page no longer rebuilds itself every five seconds: devices, tiles and events stay put and only what actually changed is updated, so the scanning dot no longer stutters, the edit buttons under your mouse no longer flicker, icons no longer flash and a text selection is no longer lost. A refresh now lands all at once instead of section by section. "Last seen", "Swept … ago" and the uptime count every second instead of jumping in fives, without asking the dongle for anything more often. In a device's details, the 24-hour chart no longer reloads on every refresh, and on a phone a device row you have expanded stays expanded.

## v0.21.1 (2026-09-23)

Updates download reliably again - but this one has to go on by USB. Firmware up to v0.21.0 runs short of memory partway through downloading an update and gives up, so a dongle cannot fetch this fix by itself: install it once from the web installer at landa.sh, leaving "Erase device" unticked so your settings, devices and links are kept, and updates after it come over the air as before. v0.21.0 was withdrawn for this reason, and everything it brought is in this release. Notes and saved passwords now live only on dashboard links: the Notes and Secret panels are gone from a device's details, along with the note and key icons in the device list, since what is worth writing down is almost always a service rather than the box it runs on. Notes and credentials on your links are untouched; a note or secret you had put on a device is no longer shown but is not deleted, and a factory reset or destroying the vault removes it for good. The "Seen over the last 24 hours" chart now always spans the whole day, filling in from the right after a restart, and no longer shows the current five minutes as down before the device has been checked. Destroying the vault now counts your link credentials correctly when it asks you to confirm.

## v0.20.1 (2026-09-22)

Quieter console: once every device has been port-scanned, the dongle now says so once instead of logging three lines every five seconds. Nothing changes on the dashboard.

## v0.20.0 (2026-09-22)

Set up a replacement dongle in one go. Straight after installing, the installer at landa.sh can now restore your backup over the same USB cable: choose your .landash file, enter its passphrase, and the new dongle comes up on your Wi-Fi with everything from the old one, without the setup network. Settings > Maintenance no longer offers Import devices, since a backup does that job and more; Export devices is still there.

## v0.19.0 (2026-09-22)

Back up your whole dongle to one file, and restore it onto the same dongle or a replacement. Settings > Maintenance > Backup downloads a .landash file holding your Wi-Fi details, settings, every device the dongle has seen with its nickname, your dashboard links and icons, notes, and the vault. It is protected by a passphrase you choose, and the vault's secrets stay locked under the vault passphrase inside it. Restoring checks the whole file before touching anything, then restarts the dongle into exactly the setup the backup came from. Keep the file somewhere safe: with its passphrase, it gets whoever has it onto your Wi-Fi.

## v0.18.1 (2026-09-22)

Fixes a thin line of coloured noise along the bottom edge of the screen. The picture now starts one row lower, which is where the screen actually begins, and the edges are cleared properly at start-up.

## v0.18.0 (2026-09-22)

The System tab now links to landa.sh, the changelog and the source code, and when an update is available, Settings › Maintenance links to what's new in it. The Dark theme's preview in Settings › Appearance keeps its own colours whichever theme you are using.

## v0.17.3 (2026-09-22)

Pressing Check now under Settings › Maintenance now shows Checking for updates straight away, instead of appearing to do nothing until the result arrives.

## v0.17.2 (2026-09-22)

The LANDA.SH logo now appears beside the name at the top of the dashboard, as the browser tab's icon, and on the dongle's screen.

## v0.17.1 (2026-09-22)

Small wording changes across the dashboard. No change to how anything works.

## v0.17.0 (2026-09-21)

Choose how often and how deeply devices are scanned again. Ports that have closed are removed, and you can ask to be notified when that happens. Quiet mode is explained.

## v0.16.0 (2026-09-21)

LANDA.SH now remembers up to 1,024 devices instead of refusing new ones after 128. Up to 144 are kept active at once; devices that haven't been seen for a while are stored away with their names, notes and ports, and come straight back when they reappear. See them under Show them on the Devices page.

## v0.15.0 (2026-09-21)

Choose how closely LANDA.SH checks your devices' services - it now asks, and starts with just the common ones. The clock sets itself from your browser's time zone. The credential vault is clearer about what it protects. Downloads of updates are more robust.

## v0.14.7 (2026-09-21)

The welcome tour now also shows you round the Devices page: finding a device, giving it a name, and opening it for its ports, history, notes and passwords.

## v0.14.6 (2026-09-21)

A short welcome tour now greets you on first use, and once after this update. It shows round the dashboard and lets you set up your credential vault. Open it again any time from Settings › Maintenance.

## v0.14.5 (2026-09-21)

Networks larger than a /22 are scanned again, up to a /16 - a /20 takes about four minutes a sweep. The dashboard now shows which network it is on: in the status bar, on the System tab, and in Settings › Scanning with an estimate of how long a sweep takes. New dongles are called landash.

## v0.14.4 (2026-09-21)

The Firmware updates section of Settings › Maintenance now simply explains what automatic updates do, and its messages are written in plain language.

## v0.14.3 (2026-09-21)

Removes the unused access-token setting from Settings › Maintenance. Settings are now kept intact if a dongle ever has to roll back to an earlier version.

## v0.14.2 (2026-09-21)

Interrupted downloads now resume from where they stopped instead of starting
over. A dropped connection partway through an update no longer means waiting
for the next check.

## v0.14.1 (2026-09-21)

**Settings › Maintenance** now shows how often the dongle really checks for
updates, rather than always saying "every 12 hours". The first release
published here.
