exports.up = async function (knex) {
  return knex.schema.alterTable("enquete_individuels", function (table) {
    table.integer("ps_aah").nullable();
    table.integer("ps_pch").nullable();
    table.integer("ps_asi").nullable();
    table.integer("ps_rsa").nullable();
    table.integer("ps_als_apl").nullable();
    table.integer("ps_aspa").nullable();
    table.integer("ps_apa").nullable();
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("enquete_individuels", function (table) {
    table.dropColumn("ps_aah");
    table.dropColumn("ps_pch");
    table.dropColumn("ps_asi");
    table.dropColumn("ps_rsa");
    table.dropColumn("ps_als_apl");
    table.dropColumn("ps_aspa");
    table.dropColumn("ps_apa");
  });
};
