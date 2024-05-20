FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app/client

ENV BASE_URL="http://127.0.0.1:3000/"
ENV BASE_API_URL="http://127.0.0.1:3000/api/"

COPY package*.json ./
COPY . .

RUN npm ci

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]