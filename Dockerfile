FROM node:12-alpine@sha256:12b2154fb459fa5f42c54771524609db041e7ef3465935d0ca82940d2d72669d
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]