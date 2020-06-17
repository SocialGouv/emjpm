exports.up = async function (knex) {
  await knex.schema.alterTable("mandataires", function (table) {
    table.integer("lb_user_id").references("id").inTable("lb_users");
  });
  await knex.raw(`
  update mandataires m set lb_user_id = (
    select lbu.id from lb_users lbu, users u where lbu.user_id = u.id and m.user_id = u.id
  )
  `);
  return knex.schema.alterTable("lb_users", function (table) {
    table.dropColumn("user_id");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("lb_user_id");
  });
  return knex.schema.alterTable("lb_users", function (table) {
    table.integer("user_id").unique();
  });
};
