#!/bin/bash

export TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')

pg_dump --version

pg_dump --verbose -n public -Fc emjpm > /mnt/data/backup_emjpm_${TIMESTAMP}.dump

echo "backup_emjpm_${TIMESTAMP}.dump" > /mnt/data/LATEST
