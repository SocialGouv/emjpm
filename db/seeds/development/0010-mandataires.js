exports.seed = function(knex, Promise) {
  return knex("mandataires")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandataires").insert({
        etablissement: "UDAHF",
        email: "ud@ud.com",
        type: "preposes",
        code_postal: "62000",
        ville: "Arras",
        telephone: "0237100000",
        tribunal_instance: "arras",
        latitude: 1,
        longitude: 1,
        adresse: "21 rue de houx",
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
          user_id: 3
      });
    })
.then(function() {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
            etablissement: "test2",
            email: "panam@paris.com",
            type: "preposes",
            code_postal: "75000",
            ville: "Paris",
            telephone: "0237100000",
            tribunal_instance: "arras",
            latitude: 1,
            longitude: 1,
            adresse: "21 rue de houx",
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
            user_id: 4
        });
    });
};
