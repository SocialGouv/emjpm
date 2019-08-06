exports.up = function(knex) {
  return knex.schema.alterTable("service_antenne", function(table) {
    table
      .boolean("headquarters")
      .notNullable()
      .defaultTo(false);
    table.string("address_street");
    table.string("address_zip_code");
    table.string("address_city");
    table.string("contact_lastname");
    table.string("contact_firstname");
    table.string("contact_email");
    table.string("contact_phone");
    table
      .integer("mesures_in_progress")
      .notNullable()
      .defaultTo(0);
    table
      .integer("mesures_max")
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("service_antenne", function(table) {
    table.dropColumn("headquarters");
    table.dropColumn("address_street");
    table.dropColumn("address_zip_code");
    table.dropColumn("address_city");
    table.dropColumn("contact_lastname");
    table.dropColumn("contact_firstname");
    table.dropColumn("contact_email");
    table.dropColumn("contact_phone");
    table.dropColumn("mesures_in_progress");
    table.dropColumn("mesures_max");
  });
};
