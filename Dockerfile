FROM node:22

LABEL maintainer="Montimage <contact@montimage.com>"

RUN mkdir -p /opt/mmt/operator

COPY www /opt/mmt/operator

RUN chmod +x /opt/mmt/operator/bin/www

WORKDIR /opt/mmt/operator
RUN rm -rf node_modules/@tensorflow
RUN npm i @tensorflow/tfjs-node

#COPY www/config-sla-test.json  /opt/mmt/operator/config.json

EXPOSE 8080

ENTRYPOINT ["/opt/mmt/operator/bin/www"]