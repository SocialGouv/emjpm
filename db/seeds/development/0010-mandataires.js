exports.seed = function(knex, Promise) {
    return knex("mandataires")
        .del() // Deletes ALL existing entries
        .then(function() {
            // Inserts seed entries one by one in series
            return knex("mandataires").insert({
                etablissement: "test individuel",
                email: "individuel@individuel.com",
                type: "individuel",
                code_postal: "10000",
                nom: "nom individuel",
                prenom: "prenom individuel",
                ville: "ville",
                telephone: "0600000000",
                tribunal_instance: "",
                latitude: 48.862725,
                longitude: 2.287592,
                adresse: "adresse",
                capacite: 1,
                disponibilite: 2,
                dispo_max: 3,
                curatelle: 4,
                sauvegarde: 5,
                curatelle_renforce: 6,
                referent: "aucun",
                commentaire: "specialite",
                specilite: "personnes agees",
                service_id: 1,
                user_id: 1,
                secretariat: true,
                nb_secretariat: 0.8
            });
        })
        .then(function() {
            // Inserts seed entries one by one in series
            return knex("mandataires").insert({
                etablissement: "test prepose",
                email: "prepose@prepose.com",
                type: "prepose",
                code_postal: "10000",
                nom: "nom prepose",
                prenom: "prenom prepose",
                ville: "ville",
                telephone: "0600000000",
                tribunal_instance: "",
                latitude: 48.862725,
                longitude: 2.287592,
                adresse: "adresse",
                capacite: 1,
                disponibilite: 2,
                dispo_max: 3,
                curatelle: 4,
                sauvegarde: 5,
                curatelle_renforce: 6,
                referent: "aucun",
                commentaire: "specialite",
                specilite: "personnes agees",
                service_id: 1,
                user_id: 2,
                secretariat: false,
                nb_secretariat: 0
            });
        });
};
