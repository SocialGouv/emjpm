const { Mesure } = require("~/models");
const { OcmiMandataire } = require("~/models");
const { LbUser } = require("~/models");
const { Mandataire } = require("~/models");
const mesureStatesService = require("~/services/updateMesureStates");
const { saveMesures } = require("~/controllers/editor/service/saveMesure");
const fetchTribunaux = require("~/controllers/editor/service/fetchTribunaux");
const { MesureRessources } = require("~/models");
const { MesureEtat } = require("~/models");
const { MESURE_PROTECTION_STATUS } = require("@emjpm/biz");

module.exports = async (req, res) => {
  const { userId } = req.user;

  const mandataire = await Mandataire.query().findOne({ user_id: userId });

  const { id: mandataireId, lb_user_id: lbUserId } = mandataire;

  await deleteAllMesures(mandataireId);

  const { siret } = await LbUser.query().findById(lbUserId);

  const { mesures } = await OcmiMandataire.query().findOne({
    siret,
  });

  // check tribunal_siret validity and load tis
  const { errors: tiErrors, tribunaux } = await fetchTribunaux(mesures);
  if (tiErrors.length > 0) {
    return res.status(422).json({ tiErrors });
  }

  const allMesureDatas = mesures.map((mesure) => ({
    datas: {
      ...mesure,
      etats: mesure.etats.map((etat) => ({
        ...etat,
        date_changement_etat: new Date(etat.date_changement_etat),
        pays: etat.pays || "FR",
      })),
    },
    serviceOrMandataire: mandataire,
    ti: findTribunal(tribunaux, mesure.tribunal_siret),
    type: "mandataire",
  }));

  await saveMesures(allMesureDatas);

  await mesureStatesService.updateMandataireMesureStates(mandataireId);

  // success
  return res.json({
    en_cours: "0",
    eteinte: "0",
  });
};

function findTribunal(tribunaux, tribunalSiret) {
  return tribunaux.find((t) => t.siret === tribunalSiret);
}

async function deleteAllMesures(mandataireId) {
  await Mesure.query()
    .delete()
    .where({ mandataire_id: mandataireId })
    .andWhere("status", "in", [
      MESURE_PROTECTION_STATUS.en_cours,
      MESURE_PROTECTION_STATUS.eteinte,
    ]);
}
