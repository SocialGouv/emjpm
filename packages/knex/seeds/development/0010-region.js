exports.seed = function (knex) {
  // Inserts seed entries
  return knex("regions").insert([
    { id: 1, nom: "Guadeloupe" },
    { id: 2, nom: "Martinique" },
    { id: 3, nom: "Guyane" },
    { id: 4, nom: "La Réunion" },
    { id: 6, nom: "Mayotte" },
    { id: 11, nom: "Île-de-France" },
    { id: 24, nom: "Centre-Val de Loire" },
    { id: 27, nom: "Bourgogne-Franche-Comté" },
    { id: 28, nom: "Normandie" },
    { id: 32, nom: "Hauts-de-France" },
    { id: 44, nom: "Grand Est" },
    { id: 52, nom: "Pays de la Loire" },
    { id: 53, nom: "Bretagne" },
    { id: 75, nom: "Nouvelle-Aquitaine" },
    { id: 76, nom: "Occitanie" },
    { id: 84, nom: "Auvergne-Rhône-Alpes" },
    { id: 93, nom: "Provence-Alpes-Côte d'Azur" },
    { id: 94, nom: "Corse" },
  ]);
};
