#!/bin/bash
set -e
echo "############################################## CLEANING STACK ##############################################"
if [ ! -z "$(docker ps -q)" ]
then
  docker kill $(docker ps -q) && docker rmi -f $(docker ps -aq) && docker rmi -f $(docker images -aq) && docker system prune --force
elif [ ! -z "$(docker images -aq)" ]
then
  docker rmi -f $(docker images -aq)    && docker system prune --force
fi

