var zipCodes = require("../postal.json");

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
    return {
      code_postal: row.code_postal,
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
      cities: row.cities,
      code_insee: row.code_commune_INSEE
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
