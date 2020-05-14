
exports.up = function(knex) {
  return knex.raw(`
update mesures set type = lower(type);
update mesures set residence = lower(residence);
  `);
};

exports.down = function(knex) {

};
