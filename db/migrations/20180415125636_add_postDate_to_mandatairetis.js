exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandatairetis", function(table) {
    table
      .dateTime("postDate")
      .defaultTo(knex.fn.now())
      .alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mandatairetis", function(table) {
    table.dateTime("postDate").alter();
  });
};
