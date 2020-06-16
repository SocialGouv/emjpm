exports.seed = function (knex) {
  if (process.env.NODE_ENV === "test") {
    return knex("geolocalisation_code_postal").insert(getTestDatas());
  }
};

function getTestDatas() {
  return [
    {
      id: 1,
      code_postal: "62000",
      latitude: 50.5333,
      longitude: 2.6333,
      cities: ["ARRAS", "DAINVILLE"],
    },
    {
      id: 2,
      code_postal: "75000",
      latitude: 48.8534,
      longitude: 2.3488,
      cities: [],
    },
    {
      id: 3,
      code_postal: "93000",
      latitude: 48.9100302,
      longitude: 2.4199803,
      cities: ["BOBIGNY"],
    },
    {
      id: 4,
      code_postal: "62009",
      latitude: 50.1912767,
      longitude: 2.6897809,
      cities: ["AGNEZ LES DUISANS", "ETRUN", "DUISANS", "MAROEUIL"],
    },
    {
      id: 5,
      code_postal: "1000",
      latitude: 48.2924051,
      longitude: 4.058611,
      cities: [],
    },
  ];
}
