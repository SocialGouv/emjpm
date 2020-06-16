exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", (table) => {
    table.integer("mesures_en_attente");
  });
};

exports.down = function () {
  return Promise.resolve();
};
