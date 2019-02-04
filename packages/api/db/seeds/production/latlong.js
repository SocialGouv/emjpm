const fs = require("fs");
const path = require("path");

// parse un CSV de mesures
// renvoie les données telles qu'attendues dans la table mesures
const parseMesures = csvPath => {
  const text = fs.readFileSync(csvPath).toString();
  const rows = text.split("\n");
  return rows.map(row => {
    const [
      jour,
      mois,
      an,
      civilite,
      annee_naissance,
      type,
      lieu_de_vie,
      code_postal,
      ville,
      , // adresse
      etablissement,
      mandataire_id,
      latitude,
      longitude
    ] = row.split(";");
    return {
      code_postal,
      ville,
      etablissement,
      mandataire_id: parseInt(mandataire_id),
      annee: annee_naissance,
      type,
      date_ouverture: `${an}-${mois}-${jour}`,
      residence: lieu_de_vie.replace(/é/, "e"),
      civilite,
      status: "Mesure en cours",
      latitude,
      longitude
    };
  });
};

exports.seed = async knex => {
  // mesures
  const mesures = parseMesures(path.join(__dirname, "mesures-belgique.csv"));

  return knex
    .batchInsert("mesures", mesures)
    .returning("id")
    .then(ids => console.log("success: ", ids.length, "mesures ajoutées"));
};
