# RTSD Project

##Local servers start:

###Prerequisites
    - Docker - https://docs.docker.com/install/
    - Elasticsearch Head Chrome plugin - https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm

###Elasticsearch
    Documentation: https://www.elastic.co/guide/index.html
    Dockerhub: https://hub.docker.com/_/elasticsearch
    
    Client connection port:                 9200
    Cluster node intercommunication port:   9300
    
    - Start: ./elasticsearch/start.sh
    - Stop: ./elasticsearch/stop.sh
###VoltDB
    Documentation: https://docs.voltdb.com/
    Dockerhub: https://hub.docker.com/r/voltdb/voltdb-community/
    
    Client port:    21212
    Admin port:     21211
    Web port:       8080
    
    - Run the following command:
        docker network create -d bridge voltLocalCluster
    - Start: ./volt/start.sh
    - Stop: ./volt/stop.sh
