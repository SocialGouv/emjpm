var zipCodes = require("../postal.json");

const getCitiesForZipCode = currentZipcode => {
  const array = [];
  zipCodes.filter(e => {
    if (e.fields.code_postal === currentZipcode) {
      array.push(e.fields.nom_commune);
    }
  });
  return array;
};

const removeUnique = (arr, key) => {
  const unique = arr
    .map(e => e[key])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
};

exports.seed = knex => {
  const newRows = zipCodes.map(row => {
    const zipCodeCities = getCitiesForZipCode(row.fields.code_postal);
    return {
      code_postal: row.fields.code_postal,
      latitude: row.fields.coordonnees_gps[0],
      longitude: row.fields.coordonnees_gps[1],
      cities: zipCodeCities,
      code_insee: row.fields.code_commune_insee
    };
  });
  return knex.transaction(tr => {
    return knex
      .table("geolocalisation_code_postal")
      .del()
      .then(() => {
        return knex
          .batchInsert(
            "geolocalisation_code_postal",
            removeUnique(newRows, "code_postal")
          )
          .transacting(tr);
      });
  });
};
