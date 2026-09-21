# LANDA.SH firmware releases

Built firmware for the LANDA.SH network dashboard (a Waveshare ESP32-C6-GEEK
dongle). Dongles read `latest.json` from this branch and install the image it
names when it is newer than what they run.

Nothing here is edited by hand: `tools/release.py` in the source repository
writes each release and commits it. Pushing that commit is what publishes it.

To hold a release back, do not push. To withdraw one that is out, point
`latest.json` back at an older file *and* publish a newer version number than
the bad one - dongles never install a version lower than their own.
