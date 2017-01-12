FROM node:6.9-onbuild

ENV NODE_ENV production

RUN apt-get update && \
  apt-get install -y matchbox libav-tools xvfb iceweasel x11vnc

RUN npm install -g gulp

RUN chmod a+x /usr/src/app/script.sh
RUN /usr/src/app/script.sh
