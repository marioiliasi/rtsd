#!/usr/bin/env bash

set -e

cd kibana

. docker.properties

docker build . -t ${REGISTRY}:${TAG}

docker stop kibana || true
docker rm kibana || true

docker run --network elasticsearch --link elasticsearch:elasticsearch \
    --volume kibana\data:/usr/share/kibana/data \
    --name kibana -d -p 5601:5601 ${REGISTRY}:${TAG}

cd -
