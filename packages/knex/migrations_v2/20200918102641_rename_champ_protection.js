
exports.up = function(knex) {
  return knex.raw(`
  ALTER TABLE mesure_etat rename champ_protection to champ_mesure;
  `);
};

exports.down = function(knex) {

};
