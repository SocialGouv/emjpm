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
- branche `develop` : DEV + RECETTE

⚠️ Les PRs doivent être faites sur la branche `develop`

⚠️ Les branches master et dev, ne doivent recevoir **que des pulls requests**

Plus de détails : https://nvie.com/posts/a-successful-git-branching-model/

### Tests

- `npm run cypress` : lances les tests e2e. (on assume que le projet `eMJPM-api` est voisin de `eMJPM-app`)
- `npm run cypress:api-reset` : reset la DB de test de l'API pour lancer les tests

## Env

Editer les fichiers [.env](./.env) et copier [.env.production.sample](./.env.production.sample) en `env.production`.

Ces valeurs sont utilisées au moment du `npm run build`

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
