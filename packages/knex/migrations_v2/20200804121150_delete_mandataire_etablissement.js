
exports.up = function(knex) {
  return knex.raw(`
  DROP TABLE IF EXISTS mandataire_etablissements;
  `)
};

exports.down = function(knex) {

};
