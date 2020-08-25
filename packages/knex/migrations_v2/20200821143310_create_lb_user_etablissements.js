exports.up = function (knex) {
  return knex.schema.createTable("lb_user_etablissements", (table) => {
    table.increments("id");

    table
      .integer("lb_user_id")
      .references("id")
      .inTable("lb_users")
      .notNullable();

    table
      .integer("etablissement_id")
      .references("id")
      .inTable("etablissements")
      .notNullable();

    table.boolean("etablissement_rattachement").default(false);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("lb_user_etablissements");
};
