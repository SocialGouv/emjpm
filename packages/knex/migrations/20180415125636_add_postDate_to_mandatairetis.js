exports.up = function(knex) {
  return knex.schema.alterTable("mandatairetis", function(table) {
    table
      .dateTime("postDate")
      .defaultTo(knex.fn.now())
      .alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("mandatairetis", function(table) {
    table.dateTime("postDate").alter();
  });
};
