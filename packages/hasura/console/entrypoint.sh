#!/bin/sh
exec wait-for hasura:8080 -- $@
