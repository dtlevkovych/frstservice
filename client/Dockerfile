FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
COPY ./src/stores/common/conf.docker.ts ./src/stores/common/conf.ts 
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx/default.conf /etc/nginx/nginx.conf