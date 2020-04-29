#!/usr/bin/env bash

cd elasticsearch/launch

. docker.properties

docker build . -t ${REGISTRY}:${TAG}

docker stop elasticsearch || truedocker st
docker rm elasticsearch || true

docker network create elasticsearch || true
docker run --name elasticsearch --network elasticsearch \
    --volume elasticsearch\data:/usr/share/elasticsearch/data \
    -d -p 9200:9200 -p 9300:9300 ${REGISTRY}:${TAG}

cd -
