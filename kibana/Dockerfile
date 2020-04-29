FROM docker.elastic.co/kibana/kibana:7.6.2

USER root

COPY start_kibana.sh /usr/share/kibana/
RUN chmod 777 /usr/share/kibana/start_kibana.sh

RUN yum update -y

USER kibana

ENV PATH=$PATH:/usr/share/kibana/bin

ENTRYPOINT ["/usr/share/kibana/start_kibana.sh"]

EXPOSE 5601
