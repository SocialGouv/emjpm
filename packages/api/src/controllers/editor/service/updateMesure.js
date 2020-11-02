const { transaction } = require("objection");
const { getYear, getMonth, getDay } = require("date-fns");

const { Mesure } = require("../../../models/Mesure");
const { MesureEtat } = require("../../../models/MesureEtat");
const { MesureRessources } = require("../../../models/MesureRessources");

const getLastEtatDatas = require("./getLastEtatDatas");
const buildMesure = require("../helper/buildMesure");

async function updateMesure({
  id,
  datas,
  type,
  antenneId,
  serviceOrMandataire,
  ti,
}) {
  const mesureToUpdate = await Mesure.query()
    .where({ [`${type}_id`]: serviceOrMandataire.id })
    .findById(id);

  if (!mesureToUpdate) {
    throw new Error(
      `mesure with id = ${id} not found with ${type}_id = ${serviceOrMandataire.id}`
    );
  }

  const { lastEtat, departement, longitude, latitude } = await getLastEtatDatas(
    datas.etats
  );
  const mesureDatas = buildMesure({
    datas: datas,
    antenneId,
    lastEtat,
    departement,
    longitude,
    latitude,
    serviceOrMandataire,
    type,
    ti,
  });

  await transaction(
    Mesure,
    MesureEtat,
    MesureRessources,
    async (Mesure, MesureEtat, MesureRessources) => {
      const result = await Mesure.query()
        .patch(mesureDatas)
        .where("id", mesureToUpdate.id);

      await processEtats(MesureEtat, mesureToUpdate.id, datas);
      await processRessources(MesureRessources, mesureToUpdate.id, datas);

      return result;
    }
  );

  const mesureQueryResult = await Mesure.query()
    .withGraphFetched("[etats,ressources, tis]")
    .where("id", mesureToUpdate.id)
    .first();

  return mesureQueryResult;
}

module.exports = updateMesure;

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
