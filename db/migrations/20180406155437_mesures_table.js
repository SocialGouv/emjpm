exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.date("annee");
    table.string("type");
    table.date("date_ouverture");
    table.string("residence");
    table.string("civilite");
    table.float("latitude").alter();
    table.float("longitude").alter();
    table
      .dateTime("postDate")
      .defaultTo(knex.fn.now())
      .alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table
      .float("latitude")
      .notNullable()
      .alter();
    table
      .float("longitude")
      .notNullable()
      .alter();
    table.dateTime("postDate").alter();
  });
};
