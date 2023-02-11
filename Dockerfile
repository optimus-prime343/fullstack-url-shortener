FROM node:18

RUN apt update -y && apt upgrade -y

WORKDIR /home/app

COPY package.json .

COPY packages/client/package.json ./packages/client/package.json

COPY packages/server/package.json ./packages/server/package.json

COPY packages/shared/package.json ./packages/shared/package.json

RUN yarn