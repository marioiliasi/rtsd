#!/usr/bin/env bash

docker pull voltdb/voltdb-community

docker stop volt-test-master || true
docker rm volt-test-master || true

docker network create -d bridge voltLocalCluster

docker run -d -P \
	-e HOST_COUNT=1 -e HOSTS=volt-test-master \
	--name volt-test-master  \
	-p 8080:8080 -p 21212:21212 -p 21211:21211 \
	--network=voltLocalCluster voltdb/voltdb-community:latest