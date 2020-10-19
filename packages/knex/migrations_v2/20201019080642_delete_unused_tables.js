exports.up = function (knex) {
  return knex.raw(`
  drop table lb_structures;
  drop table lb_tribunaux;
  drop table city;
  `);
};

exports.down = function (knex) {};
