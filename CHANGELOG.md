# Changelog

Newest first. Each version's image is in [`firmware/`](firmware).

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
