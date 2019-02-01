FROM node:9.1

RUN mkdir -p /app

WORKDIR /app

COPY . .

ENV NODE_ENV production

RUN npm install

ENTRYPOINT ["npm", "run", "wait-migrate-and-start"]
