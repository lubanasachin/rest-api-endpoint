FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

ENV NODE_ENV production

COPY dist/ dist/

EXPOSE 3000

CMD [ "yarn", "start" ]