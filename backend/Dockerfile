FROM node:15-alpine

WORKDIR /usr/src/app
RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 8081

RUN npx prisma generate
CMD [ "npx", "nodemon", "src/index.ts" ]