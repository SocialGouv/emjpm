#!/bin/sh
git pull
sudo docker-compose build
sudo docker-compose stop
sudo docker-compose up --force-recreate