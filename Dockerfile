FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY . .

ENV NODE_ENV production

RUN npm install

ENTRYPOINT ["npm", "run", "wait-migrate-and-start"]
