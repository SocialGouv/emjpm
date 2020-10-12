const { transaction } = require("objection");

const { Mesure } = require("../../../models/Mesure");
const { MesureEtat } = require("../../../models/MesureEtat");
const { MesureRessources } = require("../../../models/MesureRessources");

const getLastEtatDatas = require("./getLastEtatDatas");
const buildMesure = require("../helper/buildMesure");

async function saveMesures(allMesureDatas) {
  const createdMesureIds = await transaction(
    Mesure,
    MesureEtat,
    MesureRessources,
    async (Mesure, MesureEtat, MesureRessources) => {
      const createdMesureIds = [];
      for (const mesureDatas of allMesureDatas) {
        const { datas, type, antenneId, serviceOrMandataire, ti } = mesureDatas;

        const {
          lastEtat,
          departement,
          longitude,
          latitude,
        } = await getLastEtatDatas(datas.etats);
        const mesureToCreate = buildMesure({
          datas,
          antenneId,
          lastEtat,
          departement,
          longitude,
          latitude,
          serviceOrMandataire,
          type,
          ti,
        });
        const createdMesure = await persistMesure(
          Mesure,
          MesureEtat,
          MesureRessources,
          mesureToCreate,
          datas
        );
        createdMesureIds.push(createdMesure.id);
      }
      return createdMesureIds;
    }
  );

  const mesuresQueryResult = await Mesure.query()
    .withGraphFetched("[etats,ressources, tis]")
    .whereIn("id", createdMesureIds);
  return mesuresQueryResult;
}

async function saveMesure({ datas, type, antenneId, serviceOrMandataire, ti }) {
  const { lastEtat, departement, longitude, latitude } = await getLastEtatDatas(
    datas.etats
  );
  const mesureToCreate = buildMesure({
    datas,
    antenneId,
    lastEtat,
    departement,
    longitude,
    latitude,
    serviceOrMandataire,
    type,
    ti,
  });

  const createdMesure = await transaction(
    Mesure,
    MesureEtat,
    MesureRessources,
    async (Mesure, MesureEtat, MesureRessources) => {
      return await persistMesure(
        Mesure,
        MesureEtat,
        MesureRessources,
        mesureToCreate,
        datas
      );
    }
  );

  const mesureQueryResult = await Mesure.query()
    .withGraphFetched("[etats,ressources, tis]")
    .where("id", createdMesure.id)
    .first();
  return mesureQueryResult;
}

module.exports = { saveMesures, saveMesure };

async function persistMesure(
  Mesure,
  MesureEtat,
  MesureRessources,
  mesureToCreate,
  datas
) {
  const mesure = await Mesure.query().insert(mesureToCreate);

  mesure.ressources = [];
  if (datas.ressources) {
    for (const ressource of datas.ressources) {
      const createdMesureRessource = await MesureRessources.query().insert({
        mesure_id: mesure.id,
        annee: ressource.annee || null,
        niveau_ressource: ressource.niveau_ressource,
        prestations_sociales: JSON.stringify(ressource.prestations_sociales),
      });
      mesure.ressources.push(createdMesureRessource);
    }
  }

  mesure.etats = [];
  if (datas.etats) {
    for (const etat of datas.etats) {
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
