const { validationResult } = require("express-validator");
const { getYear, getMonth, getDay } = require("date-fns");

const { MESURE_PROTECTION_STATUS } = require("@emjpm/core");
const { transaction } = require("objection");

const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { MesureRessources } = require("../../models/MesureRessources");
const { sanitizeMesureProperties } = require("../../utils/mesure");

const mesureUpdate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const {
    body,
    params: { id },
  } = req;

  const antenneId = body.antenne_id;
  // const user = req.user;
  const serviceOrMandataire = req.serviceOrMandataire;
  const ti = req.ti;
  const lastEtat = req.lastEtat;
  const departement = req.departement;
  const longitude = req.longitude;
  const latitude = req.latitude;
  const type = req.type;

  const mesureToUpdate = await Mesure.query()
    .where({ [`${type}_id`]: serviceOrMandataire.id })
    .findById(id);

  if (!mesureToUpdate) {
    return res.status(422).json({
      errors: [
        {
          msg: `mesure with id = ${id} not found with ${type}_id = ${serviceOrMandataire.id}`,
        },
      ],
    });
  }

  const mesureDatas = {
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
    await transaction(
      Mesure,
      MesureEtat,
      MesureRessources,
      async (Mesure, MesureEtat, MesureRessources) => {
        const result = await Mesure.query()
          .patch(mesureDatas)
          .where("id", mesureToUpdate.id);

        await processEtats(MesureEtat, mesureToUpdate.id, body);
        await processRessources(MesureRessources, mesureToUpdate.id, body);

        return result;
      }
    );

    const mesureQueryResult = await Mesure.query()
      .withGraphFetched("[etats,ressources]")
      .where("id", mesureToUpdate.id)
      .first();

    return res.status(201).json(sanitizeMesureProperties(mesureQueryResult));
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = mesureUpdate;

async function processRessources(MesureRessources, mesureId, body) {
  const loadedRessources = await MesureRessources.query().where(
    "mesure_id",
    mesureId
  );

  for (const ressource of body.ressources) {
    const { annee, niveau_ressource, prestations_sociales } = ressource;

    const ressourceDatas = {
      mesure_id: mesureId,
      annee,
      niveau_ressource,
      prestations_sociales: JSON.stringify(prestations_sociales),
    };
    const ressourceToUpdate = findRessource(loadedRessources, ressource);
    if (ressourceToUpdate) {
      //update
      await MesureRessources.query()
        .patch(ressourceDatas)
        .where("id", ressourceToUpdate.id);
    } else {
      //insert
      await MesureRessources.query().insert(ressourceDatas);
    }
  }

  for (const ressource of loadedRessources) {
    if (!findRessource(body.ressources, ressource)) {
      await MesureRessources.query().deleteById(ressource.id);
    }
  }
}

function findRessource(ressources, ref) {
  const refYear = ref.annee;
  for (const ressource of ressources) {
    const year = ressource.annee;
    if (year === refYear) {
      return ressource;
    }
  }
}

async function processEtats(MesureEtat, mesureId, body) {
  const loadedEtats = await MesureEtat.query().where("mesure_id", mesureId);

  for (const etat of body.etats) {
    const {
      date_changement_etat,
      nature_mesure,
      champ_mesure,
      lieu_vie,
      code_postal,
      ville,
      pays,
      type_etablissement,
      etablissement_siret,
    } = etat;

    const etatDatas = {
      mesure_id: mesureId,
      date_changement_etat,
      nature_mesure,
      champ_mesure,
      lieu_vie,
      code_postal,
      ville,
      pays,
      type_etablissement,
      etablissement_siret,
    };
    const etatToUpdate = findEtat(loadedEtats, etat);
    if (etatToUpdate) {
      //update
      await MesureEtat.query().patch(etatDatas).where("id", etatToUpdate.id);
    } else {
      //insert
      await MesureEtat.query().insert(etatDatas);
    }
  }

  for (const etat of loadedEtats) {
    if (!findEtat(body.etats, etat)) {
      await MesureEtat.query().deleteById(etat.id);
    }
  }
}

function findEtat(etats, ref) {
  const refYear = getYear(ref.date_changement_etat);
  const refMonth = getMonth(ref.date_changement_etat);
  const refDay = getDay(ref.date_changement_etat);
  for (const etat of etats) {
    const year = getYear(etat.date_changement_etat);
    const month = getMonth(etat.date_changement_etat);
    const day = getDay(etat.date_changement_etat);
    if (refYear === year && refMonth === month && refDay === day) {
      return etat;
    }
  }
}
