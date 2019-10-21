#!/bin/bash


while [ ! -f ${CRONJOB_STATUS_DIR}/${1} ]
do
  echo "Waiting for ${1} status"
  sleep 2
done
