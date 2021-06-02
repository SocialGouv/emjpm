const knex = require("~/db/knex");
const { Mesure } = require("~/models");

const getLastEtatDatas = require("./getLastEtatDatas");
const buildMesure = require("../helper/buildMesure");
const getGeoDatas = require("~/services/getGeoDatas");

async function saveMesures(allMesureDatas, trx) {
  const createdMesureIds = [];
  for (const mesureDatas of allMesureDatas) {
    const { datas, type, antenneId, serviceOrMandataire, ti, editorId } =
      mesureDatas;

    const lastEtatDatas = await getLastEtatDatas(datas.etats);
    const { lastEtat, departement } = lastEtatDatas;

    let { longitude, latitude } = lastEtatDatas;
    if (!(latitude && longitude)) {
      if (mesureDatas.latitude && mesureDatas.longitude) {
        latitude = mesureDatas.latitude;
        longitude = mesureDatas.longitude;
      } else if (datas.code_postal || datas.ville) {
        const geoloc = await getGeoDatas(datas.code_postal, datas.ville);
        latitude = geoloc.latitude;
        longitude = geoloc.longitude;
      }
    }

    const mesureToCreate = buildMesure({
      antenneId,
      datas,
      departement,
      editorId,
      lastEtat,
      latitude,
      longitude,
      serviceOrMandataire,
      ti,
      type,
    });
    const createdMesure = await persistMesure(mesureToCreate, datas, trx);
    createdMesureIds.push(createdMesure.id);
  }

  const mesuresQueryResult = await Mesure.query(trx)
    .withGraphFetched("[etats,ressources.[prestations_sociales], tis]")
    .whereIn("id", createdMesureIds);
  return mesuresQueryResult;
}

async function saveMesure(
  { datas, type, antenneId, serviceOrMandataire, ti, editorId },
  trx
) {
  const { lastEtat, departement, longitude, latitude } = await getLastEtatDatas(
    datas.etats
  );

  const mesureToCreate = buildMesure({
    antenneId,
    datas,
    departement,
    editorId,
    lastEtat,
    latitude,
    longitude,
    serviceOrMandataire,
    ti,
    type,
  });

  const createdMesure = await persistMesure(mesureToCreate, datas, trx);

  const mesureQueryResult = await Mesure.query(trx)
    .withGraphFetched("[etats, ressources.[prestations_sociales], tis]")
    .where("id", createdMesure.id)
    .first();
  return mesureQueryResult;
}

module.exports = { saveMesure, saveMesures };

async function persistMesure(mesure, datas, trx) {
  mesure.ressources = [];
  for (const ressource of datas.ressources) {
    mesure.ressources.push({
      annee: ressource.annee || null,
      mesure_ressources_prestations_sociales:
        ressource.prestations_sociales?.map((prestations_sociales) => ({
          prestations_sociales,
        })),
      niveau_ressource: ressource.niveau_ressource,
    });
  }

  mesure.etats = [];
  if (datas.etats) {
    const etatsByDateChangement = {};
    for (const etat of datas.etats) {
      const date = new Date(etat.date_changement_etat);
      const noTimeDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      etatsByDateChangement[noTimeDate.toISOString()] = etat;
    }
    const etats = Object.values(etatsByDateChangement);
    for (const etat of etats) {
      mesure.etats.push({
        champ_mesure: etat.champ_mesure,
        code_postal: etat.code_postal,
        date_changement_etat: etat.date_changement_etat,
        lieu_vie: etat.lieu_vie,
        nature_mesure: etat.nature_mesure,
        pays: etat.pays,
        type_etablissement: etat.type_etablissement,
        ville: etat.ville,
      });
    }
  }

  if (mesure.editor_id && mesure.numero_dossier) {
    const { rows } = await knex.raw(
      `
      SELECT
      id
      FROM
      mesures
      WHERE
      mesures.editor_id = ? AND
      mesures.numero_dossier = ?
      `,
      [mesure.editor_id, mesure.numero_dossier]
    );
    if (rows.length > 0) {
      mesure.id = rows[0].id;
    }
  }

  const mesureRow = await Mesure.query(trx).upsertGraph(mesure);

  return mesureRow;
}
