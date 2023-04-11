FROM node:16.15-alpine3.14

WORKDIR /usr/src/app

COPY . .
RUN npm install
EXPOSE 3000

CMD [ "npm", "run", "start" ]
