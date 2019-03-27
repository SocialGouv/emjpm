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
            adresse,
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
            latitude, //: cps[code_postal].latitude,
            longitude //: cps[code_postal].longitude
        };
    });
};

const range = (start, end) => Array.from({ length: end - start }, (k, v) => start + v);

const getCpData = row => {
    const [cp, latitude, longitude] = row.split(";");
    return {
        [cp]: {
            latitude,
            longitude
        }
    };
};

// utilise cp.geocoded.csv pour définir les lat/long par CP
// fichier généré viahttps://adresse.data.gouv.fr/csv
const cps = fs
    .readFileSync(path.join(__dirname, "cp.geocoded.csv"))
    .toString()
    .split("\n")
    .slice(1)
    .reduce(
        (cps, row) => ({
            ...cps,
            ...getCpData(row)
        }),
        {}
    );

exports.seed = async (knex, Promise) => {
    // mesures
    const mesures = parseMesures(path.join(__dirname, "mesures-belgique.csv"));

    return knex
        .batchInsert("mesures", mesures)
        .returning("id")
        .then(ids => console.log("success: ", ids.length, "mesures ajoutées"));
};
