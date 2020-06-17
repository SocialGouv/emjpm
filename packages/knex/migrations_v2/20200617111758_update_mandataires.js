exports.up = async function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.integer("lb_user_id").unique().alter();
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropUnique("lb_user_id");
  });
};
