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
      latitude: row.latitude,
      longitude: row.longitude,
      cities: row.cities
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
