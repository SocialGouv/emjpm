const tribunaux = require("../seeds/tribunaux.json");

function getRegionCode(zipcode) {
  if (!zipcode || zipcode.length !== 5) {
    return "";
  } else {
    if (zipcode.startsWith("20")) {
      // Corse
      return parseInt(zipcode, 10) < 20200 ? "2A" : "2B";
    } else if (zipcode.startsWith("97") || zipcode.startsWith("98")) {
      // Dom-Tom
      return zipcode.substring(0, 3);
    } else {
      return zipcode.substring(0, 2);
    }
  }
}

exports.up = async knex => {
  const geoloc = await knex("geolocalisation_code_postal");
  const departments = await knex("departements");
  const tis = await knex("tis");
  const existingTribunaux = tribunaux.filter(item =>
    tis.some(t => t.siret == item.siret)
  );
  const missingTribunaux = tribunaux.filter(
    item => !tis.some(t => t.siret == item.siret)
  );

  await knex.schema.alterTable("tis", table => {
    table
      .boolean("immutable")
      .defaultTo(false)
      .notNullable();

    table.string("address2").nullable();
    table.timestamp("updated_at").nullable();
    table.date("date_ouverture").nullable();
    table.date("date_fermeture").nullable();
    table.date("date_modification").nullable();
    table.string("type").nullable();
  });

  await knex.transaction(async trx => {
    // INSERT MISSING TIS

    for (var tribunal of missingTribunaux) {
      const position = geoloc.find(i => i.insee == tribunal.insee);

      const tribunalToCreate = {
        etablissement: tribunal.name,
        email: tribunal.email,
        telephone: tribunal.phone,
        siret: tribunal.siret,
        address: tribunal.address,
        address2: tribunal.address2,
        updated_at: knex.fn.now(),
        created_at: knex.fn.now(),
        date_ouverture: tribunal.openingDate,
        date_fermeture: tribunal.closingDate,
        date_modification: tribunal.modificationDate,
        immutable: true,
        type: tribunal.type
      };

      if (!position) {
        console.error("<!> code insee does not match", tribunal.insee);
      } else {
        const { code_postal, latitude, longitude, cities } = position;
        tribunalToCreate.latitude = latitude;
        tribunalToCreate.longitude = longitude;
        tribunalToCreate.ville = cities;
        tribunalToCreate.code_postal = code_postal;
        const regionCode = getRegionCode(code_postal);
        const departement = departments.find(i => i.code == regionCode);
        tribunalToCreate.departement_id = departement ? departement.id : null;

        await knex
          .insert(tribunalToCreate)
          .into("tis")
          .transacting(trx);

        console.log(`> Insertion tis`);
      }
    }

    // UPDATE EXISTING TIS

    for (var existingTribunal of existingTribunaux) {
      const tribunalToUpdate = {
        etablissement: existingTribunal.name,
        email: existingTribunal.email,
        telephone: existingTribunal.phone,
        address: existingTribunal.address,
        address2: existingTribunal.address2,
        updated_at: knex.fn.now(),
        immutable: true,
        type: existingTribunal.type
      };

      await knex("tis")
        .update(tribunalToUpdate)
        .where({ siret: existingTribunal.siret })
        .transacting(trx);

      console.log(`> Update tis (${existingTribunal.siret})`);
    }
  });
};

exports.down = async knex => {
  await knex.schema.alterTable("tis", table => {
    table.dropColumn("immutable");
    table.dropColumn("address2");
    table.dropColumn("updated_at");
    table.dropColumn("date_ouverture");
    table.dropColumn("date_fermeture");
    table.dropColumn("date_modification");
    table.dropColumn("type");
  });
};
