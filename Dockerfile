FROM nginx:alpine

WORKDIR /app

COPY ./build/ /app/

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
