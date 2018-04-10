exports.seed = function(knex, Promise) {
    return knex("mesures")
        .del() // Deletes ALL existing entries
        .then(function() {
            // Inserts seed entries one by one in series
            return knex("mesures").insert({
                code_postal: "62000",
                ville: "Arras",
                etablissement: "UDAHF",
                latitude: 1,
                longitude: 1,
                mandataire_id: 1,
                postDate: "2010-10-05",
                annee: "2010-10-05",
                type: "preposes",
                date_ouverture:"2010-10-05",
                residence: "oui",
                civilite: "madame"
            });
        })
        .then(function() {
            // Inserts seed entries one by one in series
            return knex("mesures").insert({
                code_postal: "75000",
                ville: "Paris",
                etablissement: "UDAHF",
                latitude: 1,
                longitude: 1,
                mandataire_id: 2,
                postDate: "2010-10-05",
                annee: "2010-10-05",
                type: "preposes",
                date_ouverture:"2010-10-05",
                residence: "oui",
                civilite: "madame"
        });
    });
};
