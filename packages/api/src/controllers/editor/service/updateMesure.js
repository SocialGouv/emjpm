const { transaction } = require("objection");
const { getYear, getMonth, getDay } = require("date-fns");

const { Mesure } = require("~/models");
const { MesureEtat } = require("~/models");
const { MesureRessources } = require("~/models");

const getLastEtatDatas = require("./getLastEtatDatas");
const buildMesure = require("../helper/buildMesure");

async function updateMesure({
  id,
  datas,
  type,
  antenneId,
  serviceOrMandataire,
  ti,
  editorId,
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
    antenneId,
    datas: datas,
    departement,
    editorId,
    lastEtat,
    latitude,
    longitude,
    serviceOrMandataire,
    ti,
    type,
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
    .withGraphFetched("[etats,ressources.[prestations_sociales], tis]")
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
      annee,
      mesure_id: mesureId,

      mesure_ressources_prestations_sociales: prestations_sociales.map(
        (prestations_sociales) => ({
          prestations_sociales,
        })
      ),
      niveau_ressource,
    };
    const ressourceToUpdate = findRessource(loadedRessources, ressource);

    if (ressourceToUpdate) {
      ressourceDatas.id = ressourceToUpdate.id;
    }
    await MesureRessources.query().upsertGraph(ressourceDatas);
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

  for (const etat of loadedEtats) {
    if (!findEtat(body.etats, etat)) {
      await MesureEtat.query().deleteById(etat.id);
    }
  }

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
      champ_mesure,
      code_postal,
      date_changement_etat,
      lieu_vie,
      mesure_id: mesureId,
      nature_mesure,
      pays,
      type_etablissement,
      ville,
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
