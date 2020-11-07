delete from commentaires;
delete from logs_data;
update mandataires set telephone = '0140506070'
	, adresse = '37 Quai de Grenelle'
	, telephone_portable = '0660203010'
	, competences = null
  , siret = null;
update service_antenne set contact_email = null, contact_firstname = null, contact_lastname = null, contact_phone = null;
update services set email = concat('service-', id, '@justice.fr'), nom = null, prenom = null, telephone = '0140506070', competences = null;
update tis set telephone = '0140506070';
update mesures set numero_dossier = null, annee_naissance = 1968;
update users set username = concat("type",'-',id, '@justice.fr'), nom = "type", prenom = 'Paula', email = concat("type",'-',id, '@justice.fr');
update users set password = '$2a$10$AAuEwAMCl3AUuOE3bXhzS.IWOx6Y1SPlScWcVxhW.nyNMXVL.Q1lO';
update lb_users set nom = concat("type",'-',id)
  , prenom = 'Paula'
  , email = concat("type",'-',id, '@justice.fr')
  , adresse1 = '37 Quai de Grenelle'
  , adresse2 = null;

