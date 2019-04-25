FROM node
ENV NPM_CONFIG_LOGLEVEL debug
RUN mkdir -p /usr/src/app
EXPOSE 3002
WORKDIR /usr/src/app
ADD package.json /usr/src/app/
RUN yarn install
ADD . /usr/src/app/
RUN yarn build
ENTRYPOINT ["node", "dist/index.js"]