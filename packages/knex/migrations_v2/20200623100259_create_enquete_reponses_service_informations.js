exports.up = async function (knex) {
  await knex.schema.createTable(
    "enquete_reponses_service_informations",
    (table) => {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_update").defaultTo(knex.fn.now());
      table.string("departement").nullable();
      table.string("region").nullable();
      table.string("nom").nullable();
      table.string("association").nullable();
      table.string("ccas").nullable();
      table.string("organisme_securite_sociale").nullable();
      table.string("autres").nullable();
      table.boolean("cooperation").nullable();
      table.integer("nb_structures_concernees").nullable();
      table.jsonb("affiliation_federation").nullable();
    }
  );

  await knex.schema.alterTable("enquete_reponses", (table) => {
    table
      .integer("enquete_reponses_service_informations_id")
      .references("id")
      .inTable("enquete_reponses_service_informations");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.dropColumn("enquete_reponses_service_informations_id");
  });

  await knex.schema.dropTable("enquete_reponses_service_informations");
};
