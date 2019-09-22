#!/bin/bash

export TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')

pg_dump --version

pg_dump --verbose -Fc emjpm > /tmp/backup_emjpm_${TIMESTAMP}.dump
