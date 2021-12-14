const { raw } = require("objection");

const { OcmiMandataire } = require("~/models");
const { LbUser } = require("~/models");
const { Mandataire } = require("~/models");
const { saveMesures } = require("~/controllers/editor/service/saveMesure");
const dedupMesures = require("~/utils/dedup-mesures");

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

  const warnErrors = [];
  let fatalError;
  try {
    const { siret } = await LbUser.query().findById(lbUserId);
    if (!siret) {
      throw new Error("cannot find lb user " + lbUserId);
    }

    let ocmiMandataire = await OcmiMandataire.query().findOne({
      siret,
    });

    if (!ocmiMandataire) {
      // fallback on SIREN lookup
      ocmiMandataire = await OcmiMandataire.query().findOne(
        raw("SUBSTR(siret,1,9) = ?", [siret.substr(0, 9)])
      );
    }

    if (!ocmiMandataire) {
      throw new Error("cannot find ocmi mandataire for siret " + siret);
    }

    const { mesures } = ocmiMandataire;

    // check tribunal_siret validity and load tis
    const { errors: tiErrors, tribunaux } = await fetchTribunaux(mesures);
    if (tiErrors.length > 0) {
      throw new Error(
        tiErrors
          .map(({ msg, value }) => new Error(`${msg}: ${value}`))
          .join("\n")
      );
    }

    const origLength = mesures.length;

    const allMesures = dedupMesures(mesures);

    const finalLength = allMesures.length;
    if (finalLength < origLength) {
      warnErrors.push(
        JSON.stringify({ count: origLength - finalLength, type: "doublons" })
      );
    }

    const allMesureDatas = allMesures.map((mesure) => ({
      datas: {
        ...mesure,
        etats: mesure.etats.map((etat) => ({
          ...etat,
          date_changement_etat: new Date(etat.date_changement_etat),
          pays: etat.pays || "FR",
        })),
      },
      serviceOrMandataire: mandataire,
      ti: tribunaux[mesure.tribunal_siret],
      type: "mandataire",
    }));

    await knex.transaction(async function (trx) {
      await saveMesures(allMesureDatas, trx);
    });
  } catch (e) {
    fatalError = e;
  } finally {
    await releaseLock(mutexLockKey);
  }

  if (fatalError) {
    throw fatalError;
  }

  return {
    errors: warnErrors,
  };
};
