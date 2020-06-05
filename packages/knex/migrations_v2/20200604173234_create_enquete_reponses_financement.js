exports.up = async function(knex) {
  await knex.schema.createTable("enquete_reponses_financement", table => {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("last_update").defaultTo(knex.fn.now());
    table.float("charges_personnel").nullable();
    table.float("charges_preposes").nullable();
    table.float("charges_fonctionnement").nullable();
    table.float("produits_bareme_prelevements").nullable();
    table.float("autre_produits").nullable();
    table.float("financement_public").nullable();
    table.float("aide_sociale_conseil_departemental").nullable();
  });

  await knex.schema.alterTable("enquete_reponses", table => {
    table
      .integer("enquete_reponses_financement_id")
      .references("id")
      .inTable("enquete_reponses_financement");
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("enquete_reponses", table => {
    table.dropColumn("enquete_reponses_financement_id");
  });

  await knex.schema.dropTable("enquete_reponses_financement");
};
