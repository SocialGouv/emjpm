# eMJPM

## Liens

### Dépôts du projet:
 - [eMJPM](https://github.com/SocialGouv/emjpm)
 - [schéma de données de la protection juridique des majeurs](https://github.com/SocialGouv/schema-pjm)
 - [documentation des API exposées par eMJPM](https://github.com/SocialGouv/emjpm-api-doc)
 - [Portail de la protection juridique des majeurs](https://github.com/SocialGouv/emjpm-portail)

### Documentation
- Partage de fichier: [nextcloud eMJPM](https://nextcloud.fabrique.social.gouv.fr/)

## Outils
- Ticketing: [Github](https://github.com/SocialGouv/emjpm/issues)
- Error monitoring: [Sentry](https://sentry.fabrique.social.gouv.fr/incubateur/emjpm/)
- Web analytics: [Matomo](https://matomo.fabrique.social.gouv.fr/index.php?module=CoreHome&action=index&idSite=13&period=day&date=yesterday&updated=1#?idSite=13&period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1)
- SMTP: [mailjet pour la production](https://app.mailjet.com/)
- SMTP: [mailtrap pour le dev](https://mailtrap.io/)

## Stack technique

- frontend: [NextJS](https://nextjs.org/)
- backend: [Node](https://nodejs.org/en/)
- base de données: [Hasura](https://hasura.io/)  [Postgres](https://www.postgresql.org/)

## Test

### frontend
- WIP

### backend
- Testing framework: [Jest](https://jestjs.io/)
- Environnement d'execution: [GitHub Action](https://github.com/features/actions)
- Type de test: Tests d'intégration

## CI/CD
- Tests: [GitHub Action](https://github.com/features/actions)
- Déploiement: Sur k8s dans Gitlab CI.
