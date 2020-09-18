const { validationResult } = require("express-validator");
const { MESURE_PROTECTION_STATUS } = require("@emjpm/core");
const { transaction } = require("objection");

const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { MesureRessources } = require("../../models/MesureRessources");

const { sanitizeMesureProperties } = require("../../utils/mesure");

const mesureCreate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const antenneId = req.antenne_id;
  // const user = req.user;
  const serviceOrMandataire = req.serviceOrMandataire;
  const ti = req.ti;
  const lastEtat = req.lastEtat;
  const departement = req.departement;
  const longitude = req.longitude;
  const latitude = req.latitude;
  const type = req.type;

  const { body } = req;

  const mesureToCreate = {
    annee_naissance: body.annee_naissance,
    antenne_id: antenneId,
    cabinet: body.tribunal_cabinet,
    cause_sortie: body.cause_sortie,
    champ_mesure: lastEtat.champ_mesure,
    civilite: body.civilite,
    code_postal: lastEtat.code_postal,
    date_fin_mesure: body.date_fin_mesure,
    date_nomination: body.date_nomination,
    department_id: departement.id,
    latitude,
    longitude,
    lieu_vie: lastEtat.lieu_vie,
    [`${type}_id`]: serviceOrMandataire.id,
    ti_id: ti.id,
    ville: lastEtat.ville,
    date_premier_mesure: body.date_premier_mesure,
    date_protection_en_cours: body.date_protection_en_cours,
    status: MESURE_PROTECTION_STATUS.en_cours,
    numero_dossier: body.numero_dossier,
    numero_rg: body.numero_rg,
    pays: lastEtat.pays,
    type_etablissement: lastEtat.type_etablissement,
    resultat_revision: body.resultat_revision,
    nature_mesure: lastEtat.nature_mesure,
  };

  try {
    const createdMesure = await transaction(
      Mesure,
      MesureEtat,
      MesureRessources,
      async (Mesure, MesureEtat, MesureRessources) => {
        const mesure = await Mesure.query().insert(mesureToCreate);

        mesure.ressources = [];
        if (body.ressources) {
          for (const ressource of body.ressources) {
            const createdMesureRessource = await MesureRessources.query().insert(
              {
                mesure_id: mesure.id,
                annee: ressource.annee || null,
                niveau_ressource: ressource.niveau_ressource,
                prestations_sociales: JSON.stringify(
                  ressource.prestations_sociales
                ),
              }
            );
            mesure.ressources.push(createdMesureRessource);
          }
        }

        mesure.etats = [];
        if (body.etats) {
          for (const etat of body.etats) {
            const mesureEtat = await MesureEtat.query().insert({
              mesure_id: mesure.id,
              date_changement_etat: etat.date_changement_etat,
              nature_mesure: etat.nature_mesure,
              champ_mesure: etat.champ_mesure,
              lieu_vie: etat.lieu_vie,
              code_postal: etat.code_postal,
              ville: etat.ville,
              pays: etat.pays,
              type_etablissement: etat.type_etablissement,
              etablissement_siret: etat.etablissement_siret || "",
            });
            mesure.etats.push(mesureEtat);
          }
        }
        return mesure;
      }
    );

    const mesureQueryResult = await Mesure.query()
      .withGraphFetched("[etats,ressources]")
      .where("id", createdMesure.id)
      .first();

    return res.status(201).json(sanitizeMesureProperties(mesureQueryResult));
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureCreate;
