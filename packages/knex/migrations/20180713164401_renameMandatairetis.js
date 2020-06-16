exports.up = function (knex) {
  return knex.schema.renameTable("mandatairetis", "mandataire_tis");
};

exports.down = function (knex) {
  return knex.schema.renameTable("mandataire_tis", "mandatairetis");
};
