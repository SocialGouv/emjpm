exports.up = function(knex) {
  return knex.raw(`
  alter table mesures add import_flag int null;
  `);
};

exports.down = function(knex) {
  return knex.raw(`
  alter table mesures drop import_flag;
  `);
};
