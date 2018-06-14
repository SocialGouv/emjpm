exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("regions").insert([
    { id_region: 1, region: "Auvergne-Rhône-Alpes" },
    { id_region: 2, region: "Bourgogne-Franche-Comté" },
    { id_region: 3, region: "Bretagne" },
    { id_region: 4, region: "Centre-Val de Loire" },
    { id_region: 5, region: "Corse" },
    { id_region: 6, region: "Grand Est" },
    { id_region: 7, region: "Hauts-de-France" },
    { id_region: 8, region: "Île-de-France" },
    { id_region: 9, region: "Normandie" },
    { id_region: 10, region: "Nouvelle-Aquitaine" },
    { id_region: 11, region: "Occitanie" },
    { id_region: 12, region: "Pays de la Loire" },
    { id_region: 13, region: "Provence-Alpes-Côte d'Azur" },
    { id_region: 14, region: "Guadeloupe" },
    { id_region: 15, region: "Guyane (française)" },
    { id_region: 16, region: "Martinique" },
    { id_region: 17, region: "La Réunion" },
    { id_region: 18, region: "Mayotte" }
  ]);
};
