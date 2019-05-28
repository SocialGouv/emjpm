const nomination = {
  "tutelle aux biens": "Tutelle aux biens",
  "tutelle à la personne": "Tutelle à la personne",
  "tutelle aux biens et à la personne": "Tutelle aux biens et à la personne",
  "curatelle simple aux biens": "Curatelle simple aux biens",
  "curatelle simple à la personne": "Curatelle simple à la personne",
  "curatelle simple aux biens et à la personne":
    "Curatelle simple aux biens et à la personne",
  "curatelle renforcée aux biens": "Curatelle renforcée aux biens",
  "curatelle renforcée aux biens et à la personne":
    "Curatelle renforcée aux biens et à la personne",
  "sauvegarde de justice": "Sauvegarde de justice",
  "curatelle renforcée à la personne": "Curatelle renforcée à la personne",
  "sauvegarde de justice avec mandat spécial":
    "Sauvegarde de justice avec mandat spécial"
};

exports.up = function(knex, Promise) {
  const mesures = knex("mesures");
  return mesures.then(mesures =>
    Promise.all(
      mesures.map(mesure => {
        let newNames = "";

        if (mesure.type in nomination) {
          newNames = nomination[mesure.type];
        } else {
          newNames = mesure.type;
        }
        return knex("mesures")
          .where({ "mesures.id": mesure.id })
          .update({
            type: newNames
          });
      })
    )
  );
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
