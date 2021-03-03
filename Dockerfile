# Base image
FROM git3.nexdev.net:5050/lumi-ops/docker-images/node:14.15-alpine3

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app
COPY package.json yarn.lock ./
RUN npm run reg
RUN yarn install --production

USER node
ENV PATH /opt/node_app/node_modules/.bin:$PATH
WORKDIR /opt/node_app/app
COPY ./src .

HEALTHCHECK --interval=30s CMD node --es-module-specifier-resolution=node healthcheck.js

CMD [ "node", "--max-old-space-size=8192", "--es-module-specifier-resolution=node", "./app.js" ]