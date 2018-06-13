# eMJPM app

WebApp en ReactJS pour [emjpm.beta.gouv.fr](http://emjpm.beta.gouv.Fr)

## Usage

 - npm install
 - npm start
 - npm start --production
 - npm run build

## Dev

### Workflow GIT

 - branche `master` : PROD
 - branche `recette` : RECETTE
 - branche `develop` : DEV

⚠️ Les PRs doivent être faites sur la branche DEV

⚠️ Les branches master, recette et dev, ne doivent recevoir **que des pulls requests**

Plus de détails : https://nvie.com/posts/a-successful-git-branching-model/

## Env

Editer les fichiers [.env](./.env) et [.env.production](./.env.production)

Ces valeurs sont utilisées au moment du build

## Docker

Container avec nginx-alpine et [nginx.conf](./nginx.conf).

Pour mettre à jour, executer le script [./update.sh](./update.sh)

```
# Mettre à jour les sources
git pull
# Build le front
npm run build
# Crée l'image docker
sudo docker build . -t emjpm-app
# Nettoies ancien docker
sudo docker rm emjpm-app
# Lances le docker
sudo docker run -d --restart always --name emjpm-app -p 80:80 emjpm-app
```



