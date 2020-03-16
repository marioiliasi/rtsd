#!/usr/bin/env bash

cd elasticsearch

. ./docker.properties

docker build . -t ${REGISTRY}:${TAG}

docker stop elastic || true
docker rm elastic || true

docker run --name elastic -d -p 9200:9200 -p 9300:9300 ${REGISTRY}:${TAG}

cd -