exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("geolocalisation_code_postal").insert([
    { id: 1, code_postal: "62000", latitude: 0.1, longitude: 0.1 },
    { id: 2, code_postal: "75000", latitude: 0.2, longitude: 0.2 },
    { id: 3, code_postal: "93000", latitude: 0.3, longitude: 0.3 }
  ]);
};
