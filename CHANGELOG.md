# Changelog

Newest first. Each version's image is in [`firmware/`](firmware).

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
