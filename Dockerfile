FROM node:12.2.0-alpine

WORKDIR /code

COPY ./package.json /code/package.json
# RUN yarn install --network-concurrency 1
RUN apk update \
    && apk add --no-cache --virtual .build-deps\
        git

COPY . /code/
