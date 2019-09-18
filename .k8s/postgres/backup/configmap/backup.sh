#!/bin/bash

export TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')

pg_dump --version

pg_dump -Fc emjpm > /unsafe_data/backup_emjpm_${TIMESTAMP}.dump
