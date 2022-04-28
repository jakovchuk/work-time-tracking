FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 8080

EXPOSE $PORT

CMD ["npm","run","serve"]