exports.up = async function (knex) {
  return knex.schema.table("etablissements", (table) => {
    table.dropColumn("nom");
    table.dropColumn("adresse");
    table.dropColumn("code_postal");
    table.dropColumn("ville");
    table.dropColumn("tel");
    table.dropColumn("fax");
    table.dropColumn("latitude");
    table.dropColumn("longitude");

    table.renameColumn("id_finess", "nofinesset");
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
    table.string("libdepartement");
    table.string("ligneacheminement");
    table.string("telephone");
    table.string("telecopie");
    table.string("categetab");
    table.string("libcategetab");
    table.string("categagretab");
    table.string("libcategagretab");
    table.string("siret");
    table.string("codeape");
    table.string("codemft");
    table.string("libmft");
    table.string("codesph");
    table.string("libsph");
    table.string("dateouv");
    table.string("dateautor");
    table.string("numuai");
    table.float("coordxet");
    table.float("coordyet");
    table.string("sourcecoordet");
  });
};

exports.down = async function (knex) {
};
