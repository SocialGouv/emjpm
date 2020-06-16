exports.up = function (knex) {
  return knex.raw(`
update mesures set type = lower(type);
update mesures set residence = lower(residence);
update mesures set residence = 'domicile' where residence = 'a domicile';
  `);
};

exports.down = function (knex) {};
