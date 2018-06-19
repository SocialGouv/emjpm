exports.seed = function(knex, Promise) {
    // Inserts seed entries
    return knex("regions").insert([
        { id: 1, nom: "Auvergne-Rhône-Alpes" },
        { id: 2, nom: "Bourgogne-Franche-Comté" },
        { id: 3, nom: "Bretagne" },
        { id: 4, nom: "Centre-Val de Loire" },
        { id: 5, nom: "Corse" },
        { id: 6, nom: "Grand Est" },
        { id: 7, nom: "Hauts-de-France" },
        { id: 8, nom: "Île-de-France" },
        { id: 9, nom: "Normandie" },
        { id: 10, nom: "Nouvelle-Aquitaine" },
        { id: 11, nom: "Occitanie" },
        { id: 12, nom: "Pays de la Loire" },
        { id: 13, nom: "Provence-Alpes-Côte d'Azur" },
        { id: 14, nom: "Guadeloupe" },
        { id: 15, nom: "Guyane (française)" },
        { id: 16, nom: "Martinique" },
        { id: 17, nom: "La Réunion" },
        { id: 18, nom: "Mayotte" }
    ]);
};
