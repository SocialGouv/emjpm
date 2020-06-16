exports.up = async function (knex) {
  await knex.schema.alterTable("enquete_reponses_financement", (table) => {
    table.decimal("charges_personnel", 16, 8).nullable().alter();
    table.decimal("charges_preposes", 16, 8).nullable().alter();
    table.decimal("charges_fonctionnement", 16, 8).nullable().alter();
    table.decimal("produits_bareme_prelevements", 16, 8).nullable().alter();
    table.decimal("autre_produits", 16, 8).nullable().alter();
    table.decimal("financement_public", 16, 8).nullable().alter();
    table
      .decimal("aide_sociale_conseil_departemental", 16, 8)
      .nullable()
      .alter();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("enquete_reponses_financement", (table) => {
    table.float("charges_personnel").nullable().alter();
    table.float("charges_preposes").nullable().alter();
    table.float("charges_fonctionnement").nullable().alter();
    table.float("produits_bareme_prelevements").nullable().alter();
    table.float("autre_produits").nullable().alter();
    table.float("financement_public").nullable().alter();
    table.float("aide_sociale_conseil_departemental").nullable().alter();
  });
};
