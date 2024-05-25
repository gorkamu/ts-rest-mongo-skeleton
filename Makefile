.DEFAULT_GOAL:=help

COMPOSE_PREFIX_CMD := DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 HOST_UID=$(shell id -u)
COMMAND ?= /bin/bash

ENV="local"
APP=app-db
DOCKER_COMPOSE_FILE=docker-compose.yml

.PHONY: install purge create-network purge rebuild down start stop logs images ps command command-root shell-root shell db restart rm stats help load-fixtures
# ------------------------------------------------------------------------------

install:		## Install database (create persistence layer, create network, create image, lift up container & load fixtures)
	/bin/bash ./docker/scripts/install.sh;

start:			## Start container
	${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} start

stop:			## Stop container
	${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} stop

rebuild:		## Start container rebuilding image in detached mode
	${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} up --build -d;

down:			## Down container and do a clean up
	${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} down

restart:		## Restart container
	@${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} restart

logs:			## Tail container logs with -n 100
	@${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} logs --follow --tail=100

ps:				## Show running containers
	@${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} ps

purge:			## Purge all docker stack on the host (images, containers, networks, volumes...)
	/bin/bash ./docker/scripts/cleanstack.sh

images:			## Show docker images
	@${COMPOSE_PREFIX_CMD} docker images

load-fixtures: ## Load data fixtures
	/bin/bash ./docker/db/schema/00-init.sh

create-network:	## Create "app-network" network.
	${COMPOSE_PREFIX_CMD} docker network ls|grep app-network > /dev/null || docker network create app-network

exec:	  		## Execute command ( make exec COMMAND=<command> )
	@${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm ${APP} ${COMMAND}

exec-root:	 	## Execute command as root ( make exec-root COMMAND=<command> )
	@${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm -u root ${APP} ${COMMAND}

shell-root:		## Enter container shell as root
	@${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} exec -u root ${APP} /bin/sh

shell:			## Enter container shell
	@${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} exec ${APP} /bin/sh

db:				## Enter db shell as root
	@${COMPOSE_PREFIX_CMD} docker exec -it app-db /bin/sh

rm:				## Remove container
	@${COMPOSE_PREFIX_CMD} docker-compose -f ${DOCKER_COMPOSE_FILE} rm -f

stats:			## Show docker status
	${COMPOSE_PREFIX_CMD} docker stats

help:       	## Show this help.
	@echo "\app-db Help"
	@echo "\nMake application to manage app-db docker containers"
	@echo "Make sure you are using \033[0;32mdocker version >= 20.10.7, build 20.10.7-0ubuntu5~20.04.2\033[0m & \033[0;32mdocker-compose version >= 1.25.0, build unknown\033[0m"
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m \n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
