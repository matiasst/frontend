FROM node:16.15-alpine3.14

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build
EXPOSE 4000

CMD [ "npm", "run", "start" ]
