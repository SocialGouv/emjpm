exports.up = async function (knex) {
  await knex.schema.alterTable(
    "enquete_reponses_service_informations",
    async (table) => {
      table.dropColumn("cooperation");
      table.string("affiliation_federation").nullable().alter();
      table.dropColumn("association");
      table.dropColumn("ccas");
      table.dropColumn("organisme_securite_sociale");
      table.dropColumn("autres");
      table.string("type_organisme_gestionnaire").nullable();
    }
  );
};

exports.down = async function (knex) {
  await knex.schema.alterTable(
    "enquete_reponses_service_informations",
    async (table) => {
      table.boolean("cooperation").nullable();
      table.jsonb("affiliation_federation").nullable().alter();
      table.string("association").nullable();
      table.string("ccas").nullable();
      table.string("organisme_securite_sociale").nullable();
      table.string("autres").nullable();
      table.dropColumn("type_organisme_gestionnaire");
    }
  );
};
