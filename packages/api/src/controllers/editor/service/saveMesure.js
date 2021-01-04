const { transaction } = require("objection");

const { Mesure } = require("~/models");
const { MesureEtat } = require("~/models");
const { MesureRessources } = require("~/models");

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
          antenneId,
          datas,
          departement,
          lastEtat,
          latitude,
          longitude,
          serviceOrMandataire,
          ti,
          type,
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
    antenneId,
    datas,
    departement,
    lastEtat,
    latitude,
    longitude,
    serviceOrMandataire,
    ti,
    type,
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
    .withGraphFetched("[etats, ressources.[prestations_sociales], tis]")
    .where("id", createdMesure.id)
    .first();
  return mesureQueryResult;
}

module.exports = { saveMesure, saveMesures };

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
      const createdMesureRessource = await MesureRessources.query().insertGraph(
        {
          annee: ressource.annee || null,
          mesure_id: mesure.id,

          mesure_ressources_prestations_sociales: ressource.prestations_sociales.map(
            (prestations_sociales) => ({
              prestations_sociales,
            })
          ),
          niveau_ressource: ressource.niveau_ressource,
        }
      );
      mesure.ressources.push(createdMesureRessource);
    }
  }

  mesure.etats = [];
  if (datas.etats) {
    for (const etat of datas.etats) {
      const mesureEtat = await MesureEtat.query().insert({
        champ_mesure: etat.champ_mesure,
        code_postal: etat.code_postal,
        date_changement_etat: etat.date_changement_etat,
        lieu_vie: etat.lieu_vie,
        mesure_id: mesure.id,
        nature_mesure: etat.nature_mesure,
        pays: etat.pays,
        type_etablissement: etat.type_etablissement,
        ville: etat.ville,
      });
      mesure.etats.push(mesureEtat);
    }
  }
  return mesure;
}
