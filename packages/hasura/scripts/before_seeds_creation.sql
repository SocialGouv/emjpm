--hasura
 delete from hdb_catalog.event_log;
 delete from hdb_catalog.event_invocation_logs;
 delete from hdb_catalog.remote_schemas;
 delete from hdb_catalog.event_triggers;

 -- editors
 truncate editors cascades;

-- commentaires
truncate commentaires;
truncate enquete_reponses;

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
delete from direction where department_id <> 76;
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
