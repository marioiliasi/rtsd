FROM docker.elastic.co/elasticsearch/elasticsearch:7.6.2

USER root

COPY elasticsearch.yml /usr/share/elasticsearch/config/
COPY jvm.options /usr/share/elasticsearch/config/

USER elasticsearch

ENV PATH=$PATH:/usr/share/elasticsearch/bin

ENTRYPOINT ["elasticsearch"]

EXPOSE 9200 9300
