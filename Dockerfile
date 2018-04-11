FROM nginx:1.13-alpine

COPY ./out /www

COPY nginx.conf /etc/nginx/nginx.conf
