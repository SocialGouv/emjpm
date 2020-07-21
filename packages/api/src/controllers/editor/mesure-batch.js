const { transaction } = require("objection");

const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
// const { MesureEtat } = require("../../models/MesureEtat");
const { Departement } = require("../../models/Departement");
const { Tis } = require("../../models/Tis");
const getRegionCode = require("../../utils/getRegionCode");

const mesureBatch = async (req, res) => {
  const {
    body,
    user: { user_id },
  } = req;
  let user;
  let serviceOrMandataire;
  let mesures;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ error: "User not found" });
  }

  const type = user.type === "service" ? "service" : "mandataire";

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
  } catch (error) {
    return res.status(422).json({ error: `${type} not found` });
  }

  try {
    const regionCodes = body.mesures
      ? body.mesures.reduce((acc, item) => {
          const regionCodes = item.etats.reduce((codes, { code_postal }) => {
            if (code_postal) {
              const regionCode = getRegionCode(code_postal);
              if (!codes.includes(regionCode)) {
                return codes.concat(regionCode);
              }
            }
            return codes;
          }, []);

          const results = [...acc];
          regionCodes.forEach((regionCode) => {
            if (!results.includes(regionCode)) {
              results.push(regionCode);
            }
          });

          return results;
        }, [])
      : [];

    const departements = await Departement.query().whereIn("code", regionCodes);

    const createdObjects = await transaction(
      Mesure,
      // MesureEtat,
      async (Mesure) => {
        for (const idx in body.mesures) {
          const mesure = body.mesures[idx];
          const lastEtat = mesure.etats
            ? mesure.etats[mesure.etats.length - 1]
            : null;

          let departementId = null;
          if (lastEtat && lastEtat.code_postal && departements) {
            const departement = departements.find((d) => {
              return d.code === getRegionCode(lastEtat.code_postal);
            });
            if (departement) {
              departementId = departement.id;
            }
          }

          let tis = null;
          if (mesure.tribunal_siret) {
            tis = await Tis.query()
              .where("siret", mesure.tribunal_siret)
              .first();
          }
          if (!tis) {
            return res.status(400).json({ error: "Siret does not valid" });
          }

          const inserted = await Mesure.query().insert({
            annee_naissance: mesure.annee_naissance,
            antenne_id: mesure.antenne_id || null,
            cabinet: mesure.tribunal_cabinet,
            cause_sortie: mesure.cause_sortie,
            champ_mesure: lastEtat ? lastEtat.champ_mesure : null,
            civilite: mesure.civilite,
            code_postal: lastEtat ? lastEtat.code_postal : null,
            date_fin_mesure: mesure.date_fin_mesure
              ? new Date(mesure.date_fin_mesure).toISOString()
              : null,
            date_nomination: mesure.date_nomination
              ? new Date(mesure.date_nomination).toISOString()
              : null,
            department_id: departementId,
            etablissement: null,
            etablissement_id: null,
            judgment_date: null,
            latitude: 10.5,
            lieu_vie: lastEtat ? lastEtat.lieu_vie : null,
            longitude: 10.5,
            [`${type}_id`]: serviceOrMandataire.id,
            ti_id: tis ? tis.id : null,
            ville: lastEtat ? lastEtat.ville : null,
            date_premier_mesure: mesure.date_premier_mesure
              ? new Date(mesure.date_premier_mesure).toISOString()
              : null,
            date_protection_en_cours: mesure.date_protection_en_cours
              ? new Date(mesure.date_protection_en_cours).toISOString()
              : null,
            status: "en_cours",
            numero_dossier: mesure.numero_dossier,
            numero_rg: mesure.numero_rg,
            pays: lastEtat ? lastEtat.pays : null,
            magistrat_id: null,
            type_etablissement: lastEtat ? lastEtat.type_etablissement : null,
            resultat_revision: mesure.resultat_revision,
          });
          console.log("inserted", inserted);
        }

        console.log("createdObjects", createdObjects);

        // return Animal.query().insert({ name: "Scrappy" });
      }
    );

    // mesures = await Mesure.query().insert(payload);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(201).json({ mesures });
};

module.exports = mesureBatch;
