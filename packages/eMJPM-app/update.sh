#!/bin/sh

git pull

npm run build

sudo docker build . -t emjpm-app

sudo docker rm -f emjpm-app

sudo docker run -d --restart always --name emjpm-app -p 80:80 emjpm-app