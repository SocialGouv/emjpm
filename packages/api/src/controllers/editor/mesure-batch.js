const { transaction } = require("objection");

const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { Departement } = require("../../models/Departement");
const { Tis } = require("../../models/Tis");
const { MesureRessources } = require("../../models/MesureRessources");
const getRegionCode = require("../../utils/getRegionCode");
const { sanitizeMesureProperties } = require("../../utils/mesure");
const { ServiceAntenne } = require("../../models/ServiceAntenne");
const { ServiceMember } = require("../../models/ServiceMember");

const mesureBatch = async (req, res) => {
  const { body } = req;

  const {
    locals: {
      oauth: { token },
    },
  } = res;
  const {
    user: { id: user_id },
  } = token;

  let user;
  let serviceOrMandataire;

  const antennes = await ServiceAntenne.query()
    .select("id")
    .whereIn(
      "service_id",
      ServiceMember.query().select("service_id").where("user_id", user_id)
    );

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: "user not found" }] });
  }

  const type = user.type === "service" ? "service" : "mandataire";

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: `${type} not found` }] });
  }

  try {
    const regionCodes = body.mesures
      ? body.mesures.reduce((acc, item) => {
          const regionCodes = !item.etats
            ? []
            : item.etats.reduce((codes, { code_postal }) => {
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

    const createdMesures = await transaction(
      Mesure,
      MesureEtat,
      MesureRessources,
      async (Mesure, MesureEtat, MesureRessources) => {
        const results = [];

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
            throw new Error(`siret (${mesure.tribunal_siret}) is not valid`);
          }

          if (
            mesure.antenne_id &&
            (!antennes.length ||
              !antennes.map(({ id }) => id).includes(mesure.antenne_id))
          ) {
            throw new Error(
              `antenne_id (${mesure.antenne_id}) does not match with your service.`
            );
          }

          const createdMesure = await Mesure.query().insert({
            annee_naissance: `${mesure.annee_naissance}`,
            antenne_id: mesure.antenne_id || null,
            cabinet: mesure.tribunal_cabinet,
            cause_sortie: mesure.cause_sortie,
            champ_mesure: lastEtat ? lastEtat.champ_mesure : null,
            civilite: mesure.civilite,
            code_postal: lastEtat ? lastEtat.code_postal : null,
            date_fin_mesure: mesure.date_fin_mesure
              ? mesure.date_fin_mesure
              : null,
            date_nomination: mesure.date_nomination
              ? mesure.date_nomination
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
              ? mesure.date_premier_mesure
              : null,
            date_protection_en_cours: mesure.date_protection_en_cours
              ? mesure.date_protection_en_cours
              : null,
            status: "en_cours",
            numero_dossier: mesure.numero_dossier,
            numero_rg: mesure.numero_rg,
            pays: lastEtat ? lastEtat.pays : null,
            magistrat_id: null,
            type_etablissement: lastEtat ? lastEtat.type_etablissement : null,
            resultat_revision: mesure.resultat_revision,
            nature_mesure: lastEtat ? lastEtat.nature_mesure : null,
          });

          createdMesure.ressources = [];
          if (mesure.ressources) {
            for (const ressource of mesure.ressources) {
              const createdMesureRessource = await MesureRessources.query().insert(
                {
                  mesure_id: createdMesure.id,
                  annee: ressource.annee || null,
                  niveau_ressource: ressource.niveau_ressource,
                  prestations_sociales: JSON.stringify(
                    ressource.prestations_sociales
                  ),
                }
              );
              createdMesure.ressources.push(createdMesureRessource);
            }
          }

          createdMesure.etats = [];
          if (mesure.etats) {
            for (const etat of mesure.etats) {
              const mesureEtat = await MesureEtat.query().insert({
                mesure_id: createdMesure.id,
                date_changement_etat: etat.date_changement_etat,
                nature_mesure: etat.nature_mesure,
                champ_mesure: etat.champ_mesure,
                lieu_vie: etat.lieu_vie || "",
                code_postal: etat.code_postal || "",
                ville: etat.ville || "",
                pays: etat.pays || "",
                type_etablissement: etat.type_etablissement,
                etablissement_siret: etat.etablissement_siret || "",
              });
              createdMesure.etats.push(mesureEtat);
            }
          }

          const mesureQueryResult = await Mesure.query()
            .withGraphFetched("[etats,ressources]")
            .where("id", createdMesure.id)
            .first();

          results.push(sanitizeMesureProperties(mesureQueryResult));
        }

        return results;
      }
    );

    return res.status(201).json({ mesures: createdMesures });
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureBatch;
