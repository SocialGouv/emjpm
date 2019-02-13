# eMJPM app

WebApp en ReactJS pour [emjpm.beta.gouv.fr](http://emjpm.beta.gouv.Fr)

## Usage

 - npm install
 - npm start
 - npm start --production
 - npm run build

# Env

Editer les fichiers [.env](./.env) et [.env.production](./.env.production)

# Docker

Container avec nginx-alpine et [nginx.con](./ngonx.conf).

```
docker build . -t emjpm-app
docker run -p 88:80 emjpm-app