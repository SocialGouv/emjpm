exports.up = async function (knex) {
  await knex("mandataires").whereNotNull("service_id").del();

  const subquery = knex("users").where("type", "service").select("id");

  await knex("mandataires").where("user_id", "in", subquery).del();

  return knex.schema.alterTable("mandataires", function (table) {
    table.integer("user_id").unique().alter();
    table.dropColumn("service_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.integer("service_id");
    table.dropUnique("user_id");
  });
};
