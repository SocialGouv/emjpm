# Imports

## Fichier Finess

### Création depuis data.gouv.fr et ajout géoloc

 - récupérer le CSV sur https://www.data.gouv.fr/fr/datasets/finess-extraction-du-fichier-des-etablissements/
 - (optionel) le nettoyer avec `node ./scripts/finess-clean.js input.csv > clean.csv`
 - lancer la geolocalisation avec `cat clean.csv | addok-geocode --columns adresse,code_postal,ville --semicolon > geocoded.csv`

### Import du fichier géocodé

 - Utiliser DBeaver pour les gros fichiers

## Related :

 - https://www.data.gouv.fr/fr/datasets/finess-extraction-du-fichier-des-etablissements/
 - addok-geocode : https://github.com/jdesboeufs/addok-geocode-stream

