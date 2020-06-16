const zipCodes = require("../seeds/postal_raw.json");

exports.up = async function (knex) {
  if (process.env.NODE_ENV === "test") {
    return Promise.resolve();
  }
  await knex.raw(`
truncate geolocalisation_code_postal;
    `);
  const newRows = zipCodes.map((row) => {
    let lat = 48.8534;
    let long = 2.3488;
    if (row.fields.coordonnees_gps) {
      const coord = row.fields.coordonnees_gps;
      lat = coord[0];
      long = coord[1];
    }
    return {
      insee: row.fields.code_commune_insee,
      code_postal: row.fields.code_postal,
      latitude: lat,
      longitude: long,
      cities: row.fields.nom_de_la_commune,
    };
  });
  for (const row of newRows) {
    await knex.raw(`
insert into geolocalisation_code_postal (code_postal, insee, latitude, longitude, cities)
  VALUES ('${row.code_postal}', '${row.insee}', ${row.latitude},${row.longitude}, '${row.cities}');
    `);
  }
  return Promise.resolve();
};

exports.down = function () {
  return Promise.resolve();
};
