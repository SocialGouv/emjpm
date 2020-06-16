exports.up = async function (knex) {
  return knex.raw(`
create table temp as select service_id, count(service_id) antenne_nb from service_antenne group by service_id;
create table temp2 as select id from service_antenne where service_id in (select service_id from temp where antenne_nb = 1);

update mesures set antenne_id = null where antenne_id in (select id from temp2);
update commentaires set antenne_id = null where antenne_id in (select id from temp2);
delete from user_antenne where antenne_id in (select id from temp2);
delete from service_antenne where id in (select id from temp2);

drop table temp;
drop table temp2;

alter table service_antenne drop headquarters CASCADE;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
alter table service_antenne add headquarters boolean null;
  `);
};
