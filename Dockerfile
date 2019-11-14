FROM node:12-alpine

RUN mkdir -p /opt && mkdir -p /opt/weather

ADD . /opt/weather

WORKDIR /opt/weather

RUN npm install && npm run client:build

CMD ["node", "./server/index.js"]
