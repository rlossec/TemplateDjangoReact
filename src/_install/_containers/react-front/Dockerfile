FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

cmd [ "npm", "run", "dev"]
