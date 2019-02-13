#!/bin/sh

# stop on any error
set -e

git pull
sudo docker-compose build
sudo docker-compose stop
sudo docker-compose up --force-recreate -d
