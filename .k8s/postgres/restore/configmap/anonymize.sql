-- editors
truncate editors cascade;
truncate access_tokens cascade;
truncate api_logs cascade;
truncate editor_token_requests cascade;

-- commentaires
truncate commentaires;

-- invitation
truncate service_member_invitations cascade;

-- logs_data
truncate logs_data cascade;

-- enquete
truncate enquetes cascade;
truncate enquete_reponses cascade;
truncate enquete_reponses_activite cascade;
truncate enquete_reponses_agrements_formations cascade;
truncate enquete_reponses_financement cascade;
truncate enquete_reponses_informations_mandataire cascade;
truncate enquete_reponses_modalites_exercice cascade;
truncate enquete_reponses_populations cascade;
truncate enquete_reponses_prepose_personel_formation cascade;
truncate enquete_reponses_prepose_prestations_sociales cascade;
truncate enquete_reponses_prestations_sociales cascade;
truncate enquete_reponses_service_informations cascade;
truncate enquete_reponses_service_personnel_formation cascade;

-- anonymise data

update mandataires set telephone = '0140506070'
	, adresse = '37 Quai de Grenelle'
	, telephone_portable = '0660203010'
	, competences = null
  , siret = null;
update service_antenne set contact_email = null
  , contact_firstname = null
  , adresse = 'rue de l''antenne'
  , contact_lastname = null
  , contact_phone = null
  , name = concat('Antenne-', id);
update services set email = concat('service-', id, '@justice.fr')
  , etablissement = concat('service-', id)
  , siret = null
  , nom = null
  , prenom = null
  , adresse = 'Rue du service tutellaire'
  , lb_adresse = 'Rue du service tutellaire'
  , org_nom = 'Organisme gestionnaire'
  , org_adresse = 'Rue de l''organisme gestionnaire'
  , telephone = '0140506070'
  , competences = null;
update tis set telephone = '0140506070';
update mesures set numero_dossier = null, annee_naissance = 1968, numero_rg = id;
update users set username = concat("type",'-',id, '@justice.fr'), nom = "type", prenom = 'Paula', email = concat("type",'-',id, '@justice.fr');
update users set password = '$2a$10$AAuEwAMCl3AUuOE3bXhzS.IWOx6Y1SPlScWcVxhW.nyNMXVL.Q1lO';
update lb_users set nom = concat("type",'-',id)
  , siret = null
  , prenom = 'Paula'
  , email = concat("type",'-',id, '@justice.fr')
  , adresse1 = '37 Quai de Grenelle'
  , adresse2 = null;

