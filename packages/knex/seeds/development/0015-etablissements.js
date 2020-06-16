exports.seed = function (knex) {
  // Inserts seed entries
  return knex("etablissements").insert([
    {
      id: 1,
      id_finess: 1,
      nom: "Etablissement 1",
      code_postal: "75010",
      ville: "Paris",
    },
    {
      id: 2,
      id_finess: 2,
      nom: "Etablissement 2",
      code_postal: "93100",
      ville: "Montreuil",
    },
    {
      id: 3,
      id_finess: 3,
      nom: "Etablissement 3",
      code_postal: "92000",
      ville: "Neuilly",
    },
    {
      id: 4,
      id_finess: 4,
      nom: "Etablissement 4",
      code_postal: "93200",
      ville: "Saint-Denis",
    },
    {
      id: 5,
      id_finess: 5,
      nom: "Etablissement 5",
      code_postal: "93500",
      ville: "Aubervilliers",
    },
  ]);
};
