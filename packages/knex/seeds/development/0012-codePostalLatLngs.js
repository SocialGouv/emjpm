const zipCodes = require("../postal.json");

exports.seed = function(knex) {
  if (process.env.NODE_ENV === "test") {
    return knex("geolocalisation_code_postal").insert(getTestDatas());
  }

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

function removeUnique(arr, key) {
  const unique = arr
    .map(e => e[key])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);
  return unique;
}

function getTestDatas() {
  return [
    {
      id: 1,
      code_postal: "62000",
      latitude: 50.5333,
      longitude: 2.6333,
      cities: ["ARRAS", "DAINVILLE"]
    },
    {
      id: 2,
      code_postal: "75000",
      latitude: 48.8534,
      longitude: 2.3488,
      cities: []
    },
    {
      id: 3,
      code_postal: "93000",
      latitude: 48.9100302,
      longitude: 2.4199803,
      cities: ["BOBIGNY"]
    },
    {
      id: 4,
      code_postal: "62009",
      latitude: 50.1912767,
      longitude: 2.6897809,
      cities: ["AGNEZ LES DUISANS", "ETRUN", "DUISANS", "MAROEUIL"]
    },
    {
      id: 5,
      code_postal: "1000",
      latitude: 48.2924051,
      longitude: 4.058611,
      cities: []
    }
  ];
}
