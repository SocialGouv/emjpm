exports.up = function (knex) {
  return knex.raw(`
delete from magistrat where user_id in (141, 137);
delete from user_role where user_id in (141, 137);
delete from users where id in (141, 137);

UPDATE users SET email = LOWER(TRIM(email));
  `);
};

exports.down = function () {
  return Promise.resolve();
};
