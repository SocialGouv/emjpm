exports.up = function(knex, Promise) {
  const mesures = knex("mesures");

  return mesures.then(mesures =>
    Promise.all(
      mesures.map(mesure => {
        let newNames = "";
        switch (mesure.type) {
          case "tutelle aux biens":
            newNames = "Tutelle aux biens";
            break;
          case "tutelle à la personne":
            newNames = "Tutelle à la personne";
            break;
          case "tutelle aux biens et à la personne":
            newNames = "Tutelle aux biens et à la personne";
            break;
          case "curatelle simple aux biens":
            newNames = "Curatelle simple aux biens";
            break;
          case "curatelle simple à la personne":
            newNames = "Curatelle simple à la personne";
            break;
          case "curatelle simple aux biens et à la personne":
            newNames = "Curatelle simple aux biens et à la personne";
            break;
          case "curatelle renforcée aux biens":
            newNames = "Curatelle renforcée aux biens";
            break;
          case "curatelle renforcée aux biens et à la personne":
            newNames = "Curatelle renforcée aux biens et à la personne";
            break;
          case "sauvegarde de justice":
            newNames = "Sauvegarde de justice";
            break;
          case "curatelle renforcée à la personne":
            newNames = "Curatelle renforcée à la personne";
            break;
          case "sauvegarde de justice avec mandat spécial":
            newNames = "Sauvegarde de justice avec mandat spécial";
            break;
          default:
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
  const mesures = knex("mesures");

  return mesures.then(mesures => {
    Promise.all(
      mesures.map(mesure => {
        let newNames = "";
        switch (mesure.type) {
          case "Tutelle aux biens":
            newNames = "tutelle aux biens";
            break;
          case "Tutelle à la personne":
            newNames = "tutelle à la personne";
            break;
          case "Tutelle aux biens et à la personne":
            newNames = "tutelle aux biens et à la personne";
            break;
          case "Curatelle simple aux biens":
            newNames = "curatelle simple aux biens";
            break;
          case "Curatelle simple à la personne":
            newNames = "curatelle simple à la personne";
            break;
          case "Curatelle simple aux biens et à la personne":
            newNames = "curatelle simple aux biens et à la personne";
            break;
          case "Curatelle renforcée aux biens":
            newNames = "curatelle renforcée aux biens";
            break;
          case "Curatelle renforcée aux biens et à la personne":
            newNames = "curatelle renforcée aux biens et à la personne";
            break;
          case "Sauvegarde de justice":
            newNames = "sauvegarde de justice";
            break;
          case "Sauvegarde de justice avec mandat spécial":
            newNames = "sauvegarde de justice avec mandat spécial";
            break;
          default:
            console.log(
              "we haven't found " + mesure.type + " with id " + mesure.id + "."
            );
        }
        knex("mesures")
          .where("mesures.id", mesure.id)
          .update({
            type: newNames
          });
      })
    );
  });
};
