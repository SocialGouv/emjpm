exports.up = async (knex) => {
  await knex.schema.alterTable("mesures", (table) => {
    table.string("pays").defaultTo("FR").notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.table("mesures", (table) => {
    table.dropColumn("pays");
  });
};
