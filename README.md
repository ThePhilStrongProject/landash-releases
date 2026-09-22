# LANDA.SH firmware

Firmware updates for **LANDA.SH**, a small home-network dashboard that runs on
a [Waveshare ESP32-C6-GEEK](https://www.waveshare.com/wiki/ESP32-C6-GEEK) USB
dongle. Plug it in and it joins your Wi-Fi, finds the devices on your network,
works out what each one is, and serves a dashboard of them from the dongle
itself. It needs no cloud service, app or account.

**[Project page and browser installer](https://thephilstrongproject.github.io/landash-releases/)**
· **[Source code](https://github.com/ThePhilStrongProject/landash)**
· [Changelog](CHANGELOG.md)

This repository holds the built firmware that dongles update themselves from,
and the project page with its browser installer. The source code is at
[ThePhilStrongProject/landash](https://github.com/ThePhilStrongProject/landash),
under the [GPL-3.0](https://github.com/ThePhilStrongProject/landash/blob/main/LICENSE);
each `landash-vX.Y.Z.bin` is built from the tag of the same name there.

## What's here

| | |
|---|---|
| [`latest.json`](latest.json) | The current release: its version, the image file and its size. |
| [`firmware/`](firmware) | One firmware image per release, `landash-vX.Y.Z.bin` (older ones are named `netdash-…`). |
| [`CHANGELOG.md`](CHANGELOG.md) | What changed in each release. |
| [`install/`](install) | The browser installer's manifest and boot parts, used by the project page. |
| [`index.html`](index.html) | The project page, served by GitHub Pages. |

## How a dongle updates

Two minutes after it starts, and every 12 hours after that, a dongle reads
`latest.json` over HTTPS. If that version is newer than the one it is running,
it:

1. downloads the image, resuming where it stopped if the connection drops,
2. checks the image is LANDA.SH firmware and is the version `latest.json`
   promised, before writing any of it,
3. verifies the image's built-in SHA-256 checksum, then restarts into it,
4. keeps the new version only once it has run for a minute and got back onto
   Wi-Fi. Otherwise it automatically goes back to the version it had, and will
   not install that release again by itself.

A dongle never installs a version older than its own. It fetches two files and
sends nothing about your network. As with any download, GitHub sees the
request come from your IP address.

You can switch automatic updates off, or have them wait for your go-ahead,
under **Settings › Maintenance** on the dashboard. The same page shows the
installed version and when it last checked.

## Setting up a new board

Use the installer on the project page,
<https://thephilstrongproject.github.io/landash-releases/>, in Chrome or Edge.
It writes the bootloader, partition table and the current release over USB
from `install/manifest.json`, so a new board starts on the same version the
others update to.

The images in `firmware/` are only the application, for dongles that already
run LANDA.SH v0.14.0 or later; on their own they will not set up a new board.

## Checking a file

Every image records its own project name and version. With Python and
[esptool](https://github.com/espressif/esptool) installed:

```
esptool image-info firmware/landash-v0.16.0.bin                  # esptool 5
python -m esptool image_info --version 2 firmware/landash-v0.16.0.bin   # esptool 4
```

Look for `Project name: netdash` and `App version: v0.16.0`.
