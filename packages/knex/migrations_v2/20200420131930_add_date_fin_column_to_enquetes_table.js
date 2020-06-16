exports.up = async function (knex) {
  return knex.schema.alterTable("enquetes", (table) => {
    table.timestamp("date_fin");
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("enquetes", function (table) {
    table.dropColumn("date_fin");
  });
};
