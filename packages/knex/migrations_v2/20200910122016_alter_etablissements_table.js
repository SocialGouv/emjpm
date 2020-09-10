exports.up = async function (knex) {
  await knex.raw("TRUNCATE TABLE lb_user_etablissements;");
  await knex.dropTable("etablissements");

  await knex.schema.createTable("etablissements", (table) => {
    table.increments("id");
    table.string("nofinesset");
    table.string("nofinessej");
    table.string("rs");
    table.string("rslongue");
    table.string("complrs");
    table.string("compldistrib");
    table.string("numvoie");
    table.string("typvoie");
    table.string("voie");
    table.string("compvoie");
    table.string("lieuditbp");
    table.string("commune");
    table.string("departement");
    table.string("libdepartement");
    table.string("ligneacheminement");
    table.string("telephone");
    table.string("telecopie");
    table.string("categetab");
    table.string("libcategetab");
    table.string("siret");
    table.string("codeape");
    table.string("codemft");
    table.string("libmft");
    table.string("codesph");
    table.string("libsph");
    table.string("dateouv");
    table.string("dateautor");
    table.string("datemaj");
    table.string("numuai");
    table.string("nofinesset");
    table.string("coordxet");
    table.string("coordyet");
    table.string("sourcecoordet");
    table.string("datemaj");
  });
};

exports.down = async function (knex) {
  await knex.dropTable("etablissements");
  await knex.schema.createTable("etablissements", (table) => {
    table.increments("id");
    // TODO
  });
};
