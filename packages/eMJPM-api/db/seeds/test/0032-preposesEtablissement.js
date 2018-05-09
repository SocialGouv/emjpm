exports.seed = function(knex, Promise) {
    return knex("EtablissementPreposes")
        .del() // Deletes ALL existing entries
        .then(function() {
            // Inserts seed entries one by one in series
            return knex("EtablissementPreposes").insert({
                code_postal: "62000",
                ville: "Arras",
                etablissement: "UDAHF",
                mandataire_id: 1,
                telephone: "00 00 00 00 00",
                adresse: "1 rue du Test"
            });
        })
};