#!/bin/sh

# stop on any error
set -e

git pull

npm install
npm run build

sudo docker build . -t emjpm-app

sudo docker rm -f emjpm-app || true

sudo docker run -d --restart always --name emjpm-app -p 80:80 -v $PWD/nginx-logs:/var/log/nginx emjpm-app
