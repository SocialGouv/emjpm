const { Mesure } = require("~/models");
const { OcmiMandataire } = require("~/models");
const { LbUser } = require("~/models");
const { Mandataire } = require("~/models");
const updateTiMesuresEvent = require("~/services/updateTiMesuresEvent.js");
const { saveMesures } = require("~/controllers/editor/service/saveMesure");
const updateGestionnaireMesuresEvent = require("~/services/updateGestionnaireMesuresEvent");
const { MESURE_PROTECTION_STATUS } = require("@emjpm/biz");

const knex = require("~/db/knex");

const { acquireLock, releaseLock } = require("~/utils/pg-mutex-lock");

const fetchTribunaux = require("~/controllers/editor/service/fetchTribunaux");

module.exports = async function updateMandataireMesuresFromOCMI({
  userId,
  manual,
}) {
  const mandataire = await Mandataire.query().findOne({ user_id: userId });

  if (!manual && !mandataire.sync_ocmi_enable) {
    return;
  }

  const { id: mandataireId, lb_user_id: lbUserId } = mandataire;

  const mutexLockKey = `import-ocmi-${mandataireId}`;
  const lockAcquired = await acquireLock(mutexLockKey, {
    timeout: 3600,
  });
  if (!lockAcquired) {
    throw new Error("cannot acquire lock for " + mutexLockKey);
  }

  const { siret } = await LbUser.query().findById(lbUserId);

  const ocmiMandataire = await OcmiMandataire.query().findOne({
    siret,
  });

  if (!ocmiMandataire) {
    return false;
  }

  const { mesures } = ocmiMandataire;

  // check tribunal_siret validity and load tis
  const { errors: tiErrors, tribunaux } = await fetchTribunaux(mesures);
  if (tiErrors.length > 0) {
    // eslint-disable-next-line no-undef
    throw new AggregateError(tiErrors);
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

  await knex.transaction(async function (trx) {
    try {
      await deleteAllMesures(mandataireId, trx);
      await saveMesures(allMesureDatas, trx);
      await updateGestionnaireMesuresEvent("mandataires", mandataireId, trx);

      const tiIds = allMesureDatas.reduce((s, { datas: { ti } }) => {
        if (ti?.id) {
          s.add(ti.id);
        }
        return s;
      }, new Set());
      for (const [tiId] of tiIds.entries()) {
        await updateTiMesuresEvent(tiId, trx);
      }

      await trx.commit();
    } catch (e) {
      console.error(e);
      await trx.rollback(e);
    }
  });

  await releaseLock(mutexLockKey);
};

function findTribunal(tribunaux, tribunalSiret) {
  return tribunaux.find((t) => t.siret === tribunalSiret);
}

async function deleteAllMesures(mandataireId, trx) {
  await Mesure.query(trx)
    .delete()
    .where({ mandataire_id: mandataireId })
    .andWhere("status", "in", [
      MESURE_PROTECTION_STATUS.en_cours,
      MESURE_PROTECTION_STATUS.eteinte,
    ]);
}
