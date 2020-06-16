exports.up = async function (knex) {
  await knex.schema.alterTable(
    "enquete_reponses_modalite_exercice",
    (table) => {
      table.renameColumn("nom", "raison_sociale");
    }
  );

  await knex.schema.renameTable(
    "enquete_reponses_modalite_exercice",
    "enquete_reponses_modalites_exercice"
  );

  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.renameColumn(
      "enquete_reponses_modalite_exercice_id",
      "enquete_reponses_modalites_exercice_id"
    );
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable(
    "enquete_reponses_modalites_exercice",
    (table) => {
      table.renameColumn("raison_sociale", "nom");
    }
  );

  await knex.schema.renameTable(
    "enquete_reponses_modalites_exercice",
    "enquete_reponses_modalite_exercice"
  );

  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.renameColumn(
      "enquete_reponses_modalites_exercice_id",
      "enquete_reponses_modalite_exercice_id"
    );
  });
};
