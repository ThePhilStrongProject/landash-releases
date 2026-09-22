# LANDA.SH firmware

**The standalone homelab dashboard that maintains itself.** A USB dongle that
finds every device and service on your network and builds your dashboard for
you.

**[landa.sh](https://landa.sh)** (project page and browser installer)
· [Source code](https://github.com/ThePhilStrongProject/landash)
· [Changelog](CHANGELOG.md)

This repository holds the built firmware that dongles update from, and the
landa.sh page with its installer. The source is at
[ThePhilStrongProject/landash](https://github.com/ThePhilStrongProject/landash)
under the [GPL-3.0](https://github.com/ThePhilStrongProject/landash/blob/main/LICENSE).
Each `landash-vX.Y.Z.bin` is built from the tag of the same name there.

## What's here

| | |
|---|---|
| [`latest.json`](latest.json) | The current release: version, image file and size. |
| [`firmware/`](firmware) | One image per release, `landash-vX.Y.Z.bin` (older ones are `netdash-…`). |
| [`CHANGELOG.md`](CHANGELOG.md) | What changed in each release. |
| [`install/`](install) | The browser installer's manifest and boot parts. |
| [`index.html`](index.html), [`assets/`](assets) | The landa.sh page, served by GitHub Pages. |

## Setting up a new board

Plug the dongle into your computer, open [landa.sh](https://landa.sh/#install)
in Chrome or Edge and press **Install**. It writes the bootloader, partition
table and current release over USB. Tick **Erase device** for a new board;
leave it unticked to keep your data.

The images in `firmware/` are only the application, for dongles already
running LANDA.SH v0.14.0 or later. On their own they won't set up a new board.

## How a dongle updates

Two minutes after it starts, and every 12 hours after that, a dongle reads
`latest.json` over HTTPS. If that version is newer than its own, it:

1. downloads the image, resuming if the connection drops,
2. checks it's LANDA.SH firmware of the promised version before writing any
   of it,
3. verifies the image's SHA-256 checksum and restarts into it,
4. keeps the new version only once it has run for a minute and reconnected to
   Wi-Fi. Otherwise it goes back to the old version and won't install that
   release again by itself.

A dongle never installs an older version. It fetches two files and sends
nothing about your network, though GitHub sees the request come from your IP
address, as with any download.

You can turn automatic updates off, or have them wait for you, under
**Settings › Maintenance**. The same page shows the installed version and the
last check.

## Checking a file

Every image records its project name and version. With Python and
[esptool](https://github.com/espressif/esptool) installed:

```
esptool image-info firmware/landash-vX.Y.Z.bin                          # esptool 5
python -m esptool image_info --version 2 firmware/landash-vX.Y.Z.bin    # esptool 4
```

Look for the version you expect, and `Project name: netdash`. That is
LANDA.SH's original internal name. It stays because dongles only accept an
update with the same project name as their own.
