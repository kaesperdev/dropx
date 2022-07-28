FROM node:16-alpine as builder

WORKDIR /build

COPY package*.json yarn.lock ./

RUN yarn install --production

COPY . .

FROM node:16-alpine

ENV NODE_ENV=production

COPY --from=builder /build /usr/src/app

WORKDIR /usr/src/app

CMD [ "yarn", "start"]