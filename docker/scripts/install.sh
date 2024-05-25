#!/bin/bash
set -euo pipefail

echo;echo;echo "############################################## INIT APP DB INSTALL ##############################################"
echo "[+] Setting variables..."
PERSISTENCE_DIR=./db

if [ ! -d "$PERSISTENCE_DIR" ]; then
    echo "[+] Creating persistence dir..."
    mkdir -p "$PERSISTENCE_DIR"
fi

echo "[+] Creating network..."
DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 HOST_UID=$(id -u) docker network ls|grep app-network > /dev/null || docker network create app-network

echo "[+] Building container..."
DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 HOST_UID=$(id -u) docker-compose -f docker-compose.yml up --build -d

echo "############################################## END APP DB INSTALL ##############################################"
