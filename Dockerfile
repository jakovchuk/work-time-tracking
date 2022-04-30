FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./src /app/src

ENV PORT 8080

EXPOSE $PORT

CMD ["npm","run","serve"]
