--hasura
 truncate hdb_catalog.event_log cascade;
 truncate hdb_catalog.event_invocation_logs cascade;
 truncate hdb_catalog.remote_schemas cascade;
 truncate hdb_catalog.event_triggers cascade;


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

-- CLEAN tis
delete from mesures where ti_id in (select id from tis where immutable = false);
delete from tis where immutable = false;

-- CLEAN mandataires
delete from mandataire_tis where ti_id <> 22;
delete from mesures where mandataire_id in (select id from mandataires where id not in (select mandataire_id from mandataire_tis));
delete from mandataires where id not in (select mandataire_id from mandataire_tis);
delete from user_role where user_id in (select id from users where type in ('individuel', 'prepose') and id not in (select user_id from mandataires));
delete from users where type in ('individuel', 'prepose') and id not in (select user_id from mandataires);

-- CLEAN service
delete from service_tis where ti_id <> 22;
delete from mesures where service_id in (select id from services where id not in (select service_id from service_tis));
delete from service_members where service_id not in (select service_id from service_tis);
delete from service_antenne where service_id not in (select service_id from service_tis);
delete from services where id not in (select service_id from service_tis);
delete from user_role where user_id in (select id from users where type in ('service') and id not in (select user_id from service_members));
delete from users where type in ('service') and id not in (select user_id from service_members);

-- CLEAN direction
delete from direction where departement_code <> '75';
delete from user_role where user_id in (select id from users where type = 'direction' and id not in (select user_id from direction));
delete from users where type = 'direction' and id not in (select user_id from direction);

-- CLEAN magistrat
update mesures set magistrat_id = null;
delete from magistrat where ti_id <> 22;
delete from user_role where user_id in (select id from users where type = 'ti' and id not in (select user_id from magistrat));
delete from users where type = 'ti' and id not in (select user_id from magistrat);

-- CLEAN lb_users
delete from lb_departements lbd where not exists (select m.lb_user_id from mandataires m where m.lb_user_id = lbd.lb_user_id);
delete from lb_user_etablissements;
delete from lb_users lbu where not exists (select m.lb_user_id from mandataires m where m.lb_user_id = lbu.id);

-- CLEAN mesures
delete from mesures where status = 'eteinte';
delete from mesures where mandataire_id in (select id from mandataires where mesures_en_cours > 100);
delete from mesures where service_id in (select id from services where mesures_in_progress > 500);
update mandataires m set mesures_en_cours = (select count(*) from mesures where mandataire_id = m.id and status = 'en_cours');
update mandataires m set mesures_en_attente = (select count(*) from mesures where mandataire_id = m.id and status = 'en_attente');
update services m set mesures_in_progress = (select count(*) from mesures where service_id = m.id and status = 'en_cours');
update services m set mesures_awaiting = (select count(*) from mesures where service_id = m.id and status = 'en_attente');

-- CLEAN etablissements
delete from etablissements where not exists (
   select 1 from lb_user_etablissements
   where lb_user_etablissements.etablissement_id = etablissements.id
   union
   select 1 from mesures
   where mesures.etablissement_id = etablissements.id
);
