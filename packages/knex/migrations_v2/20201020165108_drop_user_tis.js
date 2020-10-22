exports.up = function (knex) {
  return knex.raw(`
 DROP TABLE if exists user_tis;
  `);
};

exports.down = function () {};
