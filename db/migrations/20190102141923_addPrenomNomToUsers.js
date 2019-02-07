exports.up = function(knex, Promise) {
  const userTisAll = knex("users_tis");
  const mandataires = knex("mandataires");
  const mandataireTis = knex("mandataire_tis").innerJoin(
    "mandataires",
    "mandataire_tis.mandataire_id",
    "mandataires.id"
  );

  return knex.schema
    .alterTable("users", function(table) {
      table.string("nom");
      table.string("prenom");
      table.string("cabinet");
      table.string("email").unique();
    })
    .then(() =>
      mandataires.then(mandataires =>
        Promise.all(
          mandataires.map(mandataire =>
            knex("users")
              .where("users.id", mandataire.user_id)
              .update({
                prenom: mandataire.prenom,
                nom: mandataire.nom,
                email: mandataire.email
              })
          )
        )
      )
    )
    .then(() =>
      userTisAll.then(userTis =>
        Promise.all(
          userTis.map(userTi =>
            knex("users")
              .where("users.id", userTi.user_id)
              .update({
                prenom: userTi.prenom,
                nom: userTi.nom,
                email: userTi.email,
                cabinet: userTi.cabinet
              })
          )
        )
      )
    )
    .then(() =>
      mandataireTis.then(mandatairesTis =>
        Promise.all(
          mandatairesTis.map(mandatairesTi =>
            knex("users_tis").insert({
              ti_id: mandatairesTi.ti_id,
              user_id: mandatairesTi.user_id
            })
          )
        )
      )
    )
    .then(() =>
      knex.schema.alterTable("users_tis", function(table) {
        table.dropColumn("prenom");
        table.dropColumn("nom");
        table.dropColumn("email");
        table.dropColumn("cabinet");
        table.renameColumn("creates_at", "created_at");
      })
    )
    .then(() =>
      knex.schema.alterTable("mandataires", function(table) {
        table.dropColumn("prenom");
        table.dropColumn("nom");
        table.dropColumn("email");
      })
    )
    .then(() => knex.schema.renameTable("users_tis", "user_tis"))
    .then(() => knex.schema.dropTable("mandataire_tis"));
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable("users", function(table) {
      table.dropColumn("nom");
      table.dropColumn("prenom");
      table.dropColumn("cabinet");
      table.dropColumn("email");
    })
    .then(() => knex.schema.renameTable("user_tis", "users_tis"))
    .then(() =>
      knex.schema.alterTable("users_tis", function(table) {
        table.string("nom");
        table.string("prenom");
        table.string("cabinet");
        table.string("email");
      })
    )

    .then(() =>
      knex.schema.createTable("mandataire_tis", function(table) {
        table.increments("id").primary();
        table
          .integer("ti_id")
          .references("id")
          .inTable("tis");
        table
          .integer("mandataire_id")
          .references("id")
          .inTable("mandataires");
        table.dateTime("created_at");
      })
    );
};
