-- editors
delete from editors;
delete from access_tokens;
delete from api_logs;
delete from editor_token_requests;

-- commentaires
delete from commentaires;

-- invitation
delete from service_member_invitations;

-- log
delete from logs_data;

-- ENQUETE
delete from enquetes;
delete from enquete_reponses;
delete from enquete_services;

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
  , adresse = 'Rue du service tutelaire'
  , lb_adresse = 'Rue du service tutelaire'
  , org_nom = 'Organisme gestionnaire'
  , org_adresse = 'Rue de l''organisme gestionnaire'
  , telephone = '0140506070'
  , competences = null;
update tis set telephone = '0140506070';
update mesures set numero_dossier = null, annee_naissance = 1968, numero_rg = id;
update users set nom = "type", prenom = 'Paula', email = concat("type",'-',id, '@justice.fr');
update users set password = '$2a$10$AAuEwAMCl3AUuOE3bXhzS.IWOx6Y1SPlScWcVxhW.nyNMXVL.Q1lO';
update lb_users set nom = concat("type",'-',id)
  , siret = null
  , prenom = 'Paula'
  , email = concat("type",'-',id, '@justice.fr')
  , adresse1 = '37 Quai de Grenelle'
  , adresse2 = null;

