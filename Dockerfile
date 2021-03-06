FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm","build" ]
CMD [ "npm","start" ]