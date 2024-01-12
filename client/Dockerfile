FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app/client

COPY package*.json ./
COPY . .

RUN npm ci

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]