exports.seed = function(knex) {
  // Inserts seed entries
  return knex("geolocalisation_code_postal").insert([
    { id: 1, code_postal: "62000", latitude: 50.5333, longitude: 2.6333 },
    { id: 2, code_postal: "75000", latitude: 0.2, longitude: 0.2 },
    { id: 3, code_postal: "93000", latitude: 0.3, longitude: 0.3 },
    { id: 4, code_postal: "62009", latitude: 0.4, longitude: 0.4 },
    { id: 5, code_postal: "10000", latitude: 0.5, longitude: 0.5 }
  ]);
};
