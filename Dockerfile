FROM node:latest

RUN npm install http-server -g

ADD www/ /var/lib/www/

WORKDIR /var/lib/www/

CMD ["http-server", "-p 8888"]
