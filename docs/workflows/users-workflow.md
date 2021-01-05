# user type direction

## Création d'un compte
1. en tant qu'agent d'État je fais une demande de création de compte eMPJPM en renseignant soit mon département soi ma région selon mon administration
2. l'admin d'eMJPM reçoit un mail avec la demande
3. par l'interface d'admin il peut activer le compte après vérification de l'identité de l'utilisateur

## Liste blanche

### Création d'une association tutélaire
En tant qu'agent d'État je peux créer une association tutélaire dans le département de mon administration

### Création d'une entrée dans la liste blanche pour un mandataire individuel
En tant qu'agent d'État je peux créer une entrée dans la liste blanche pour un mandataire individuel et lui donner un agrément dans les départements de mon administration

### Création d'une entrée dans la liste blanche pour un mandataire préposé
En tant qu'agent d'État je peux créer une entrée dans la liste blanche pour un mandataire préposé et l'associer à des établissements situés dans les départements de mon administration

## Enquêtes
1. En tant qu'agent d'État de l'administration centrale (direction.type=direction_national), je peux créer une enquete en renseignant l'année
après création de l'enquête, le lien d'accès à cette enquête est visible dans les comptes de tous les mandataires.
L'enquête d'un mandataire est liée à un département:
- pour les individuels le département est celui de son département financeur (lb_departements.departement_financeur==true)
- pour les préposés le département est celui du département de mon établissement de rattachement (lb_users_etablissement.etablissement_rattachement==true)
- pour les services le département dans lequel est situé mon service
2. En tant qu'agent d'État j'ai accès aux réponses des enquêtes des mandataires des départements de mon administration
3. TODO: En tant qu'agent d'État je visualise des statistiques des enquêtes (elasticsearch, digdash)


# user type ti (magistrat)

## Création d'un compte
1. en tant que magistrat (juge des tutelles) je fais une demande de création de compte eMPJPM en renseignant le tribunal dans lequel j'exerce
2. l'admin d'eMJPM reçoit un mail avec la demande
3. par l'interface d'admin il peut activer le compte après vérification de l'identité de l'utilisateur

## Réservation d'une mesure
1. en tant que magistrat j'ai accès à la liste des mandataires (view_mesure_gestionnaire_departement):
	les individuels ayant un agrément dans le département de mon tribunal (via lb_departements.departements)
	les préposés d'un établissement localisé dans le département de mon tribunal (via lb_user_etablissements.etablissements.departements)
	les services localisés dans le département de mon tribunal (via departements)
2. je peux sélectionner un mandataire et lui réserver une mesure (création d'une mesure avec `status`=`en_attente`)


# user type mandataire individuel

## Création d'un compte
1. en tant que mandataire individuel je fais une demande de création de compte eMPJPM en renseignant mon SIRET
2. l'admin d'eMJPM reçoit un mail avec la demande
3. en tant qu'admin je peux lier cette demande de création de compte avec une entrée dans la liste blanche si le SIRET match (mandataire.siret==lb_users.siret)
4. en tant qu'admin, après association, je peux activer le compte

## Configuration compte
1. En tant qu'individuel, je peux configurer les infos suivantes:
	- une adresse de géolocalisation permettant de le localiser sur la carte du magistrat et sur ma carte listant les mesures
	- la liste des tribunaux avec lesquels je préfère travailler parmis la liste des tribunaux des départements dans lesquels j'ai un agrément (via lb_departements)

## Réception d'une réservation de mesure
1. En tant qu'individuel si un magistrat m'a réservé une mesure, je reçois un email d'avertissement
2. je peux me connecter à mon compte, sélectionner cette mesure, compléter les infos, et accepter la mesure (la passer en `status`=`en_cours`)

## Création d'une mesure
En tant qu'individuel je peux créer une mesure de 3 manières différentes:
	- en passant par la page ajouter une mesure
	- via un import CSV (ou XLS)
	- en important les mesures de mon compte OCMI (ocmi_mandataires)

## Enquêtes
1. En tant qu'indivudel, je peux accéder aux enquetes actives, renseigner et valider mes données
2. En tant qu'individuel je peux importer ces données via un tableur excel
3. TODO: mes données sont préremplies avec les infos de mes mesures

# user type prepose

## Création d'un compte
1. en tant que mandataire prepose je fais une demande de création de compte eMPJPM en renseignant mon email
2. l'admin d'eMJPM reçoit un mail avec la demande
3. en tant qu'admin je peux lier cette demande de création de compte avec une entrée dans la liste blanche si l'email match (users.email==lb_users.email)
4. en tant qu'admin, après association, je peux activer le compte

## Configuration compte
1. En tant qu'individuel, je peux configurer les infos suivantes:
	- une adresse de géolocalisation permettant de le localiser sur la carte du magistrat et sur ma carte listant les mesures
	- la liste des tribunaux avec lesquels je préfère travailler parmis la liste des tribunaux des départements dans lesquels j'ai un agrément (via lb_users_departements.etablissements.departements)

## Réception d'une réservation de mesure
1. En tant qu'individuel si un magistrat m'a réservé une mesure, je reçois un email d'avertissement
2. je peux me connecter à mon compte, sélectionner cette mesure, compléter les infos, et accepter la mesure (la passer en `status`=`en_cours`)

## Création d'une mesure
En tant qu'individuel je peux créer une mesure de 3 manières différentes:
	- en passant par la page ajouter une mesure
	- via un import CSV (ou XLS)

## Enquêtes
1. En tant qu'indivudel, je peux accéder aux enquetes actives, renseigner et valider mes données
2. En tant qu'individuel je peux importer ces données via un tableur excel
3. TODO: mes données sont préremplies avec les infos de mes mesures


# user type service

## Création d'un compte
1. En tant que `service` je fais une demande de création de compte eMPJPM en sélectionnant mon service (services)
2. l'admin d'eMJPM reçoit un mail avec la demande
3. En tant qu'admin je peux activer le compte après vérification de l'identité de l'utilisateur

## Configuration compte
1. En tant que `service`, je peux configurer les infos suivantes:
	- une adresse de géolocalisation permettant de le localiser sur la carte du magistrat et sur ma carte listant les mesures
	- la liste des tribunaux avec lesquels je préfère travailler parmis la liste des tribunaux du département dans lesquel est situé mon service ()
2. En tant que `service` je peux renseigner des `services_antennes` pour mon service

## Réception d'une réservation de mesure
1. En tant que `service` si un magistrat a réservé une mesure pour mon service, je reçois un email d'avertissement
2. je peux me connecter à mon compte, sélectionner cette mesure, compléter les infos, et accepter la mesure (la passer en `status`=`en_cours`)

## Création d'une mesure
En tant que `service` je peux créer une mesure de 3 manières différentes:
	- en passant par la page ajouter une mesure
	- via un import CSV (ou XLS)

## Envoi d'une invitation à un autre membre d'un service
En tant que `service` avec des droits admin (services_member.admin) je peux envoyer des invitations pour q'un membre de mon service ai un compte eMJPM

## Enquêtes
1. En tant que `individuel`, je peux accéder aux enquetes actives, renseigner et valider mes données
2. En tant que `individuel`, je peux importer ces données via un tableur excel
3. TODO: mes données sont préremplies avec les infos de mes mesures