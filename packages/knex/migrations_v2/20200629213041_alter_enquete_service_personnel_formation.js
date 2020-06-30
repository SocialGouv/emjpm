exports.up = async function (knex) {
  await knex.schema.alterTable(
    "enquete_service_personnel_formation",
    (table) => {
      table.renameColumn("nb_delegues_debut_annee", "nb_delegues");
      table.float("nb_delegues_fin_annee").nullable().alter();
    }
  );

  await knex.schema.alterTable(
    "enquete_service_personnel_formation",
    (table) => {
      table.renameColumn("nb_delegues_fin_annee", "nb_delegues_etp");
    }
  );

  await knex.schema.renameTable(
    "enquete_service_personnel_formation",
    "enquete_reponses_service_personnel_formation"
  );

  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.renameColumn(
      "enquete_service_personnel_formation_id",
      "enquete_reponses_service_personnel_formation_id"
    );
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable(
    "enquete_reponses_service_personnel_formation",
    (table) => {
      table.renameColumn("nb_delegues", "nb_delegues_debut_annee");
      table.renameColumn("nb_delegues_etp", "nb_delegues_fin_annee");
    }
  );

  await knex.schema.alterTable(
    "enquete_reponses_service_personnel_formation",
    (table) => {
      table.integer("nb_delegues_fin_annee").nullable().alter();
    }
  );

  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.renameColumn(
      "enquete_reponses_service_personnel_formation_id",
      "enquete_service_personnel_formation_id"
    );
  });

  await knex.schema.renameTable(
    "enquete_reponses_service_personnel_formation",
    "enquete_service_personnel_formation"
  );
};
