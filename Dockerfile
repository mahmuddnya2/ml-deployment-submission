FROM node:20.12.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN  npm install
COPY  . .
EXPOSE 8000
CMD [ "node" ,"server.js" ]