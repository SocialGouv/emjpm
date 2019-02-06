exports.up = function(knex) {
  return knex.schema.alterTable("mesures", function(table) {
    table
      .integer("ti_id")
      .references("id")
      .inTable("tis");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
