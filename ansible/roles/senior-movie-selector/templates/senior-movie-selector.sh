#! /bin/sh

echo "starting senior-movie-selector"
cd /home/chris/senior-movie-selector  && docker compose restart
xhost + && chromium-browser --disable-gpu --start-fullscreen localhost
exit 0