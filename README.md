# eMJPM app

WebApp en ReactJS pour [emjpm.beta.gouv.fr](http://emjpm.beta.gouv.Fr)

## Usage

 - npm install
 - npm start
 - npm start --production
 - npm run build

# Env

Editer les fichiers [.env](./.env) et [.env.production](./.env.production)

Ces valeurs sont utilisées au moment du build

# Docker

Container avec nginx-alpine et [nginx.conf](./nginx.conf).

```
npm run build
docker build . -t emjpm-app
docker run -d --name emjpm-app -p 88:80 emjpm-app
```

