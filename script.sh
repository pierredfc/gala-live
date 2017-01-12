#!/bin/sh
NODE_ENV=production API_TOKEN=$API_TOKEN POST_ID=$POST_ID gulp
Xvfb :0 -screen 0 1024x768x24 &
x11vnc -display :0 &
DISPLAY=:0 matchbox-window-manager &
DISPLAY=:0 firefox file:///usr/src/app/index.html &
#DISPLAY=:0 avconv -video_size 1024x768 -framerate 25 -f x11grab -i :0.0+100,200 -f rtp rtp://0.0.0.0:1234
