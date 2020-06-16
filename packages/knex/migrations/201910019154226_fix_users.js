exports.up = function (knex) {
  return knex.raw(`
delete from direction;
insert into direction (user_id) select id from users where "type" = 'direction';

delete from user_role where user_id in (select id from users where "type" = 'prepose' and id not in (select user_id from mandataires));
delete from users where "type" = 'prepose' and id not in (select user_id from mandataires);
  `);
};

exports.down = function () {
  return Promise.resolve();
};
