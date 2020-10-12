const { body, check } = require("express-validator");
const { MESURE_PROTECTION } = require("@emjpm/core");
const isBefore = require("date-fns/isBefore");
const parseISO = require("date-fns/parseISO");

const rules = [
  body("numero_rg").not().isEmpty().trim().escape(),
  body("annee_naissance").not().isEmpty().trim().escape(),
  body("civilite").isIn(MESURE_PROTECTION.CIVILITE.keys),

  body("date_nomination").custom(checkDateNomination).isDate().toDate(),
  body("date_fin_mesure").optional({ nullable: true }).isDate().toDate(),
  body("date_premier_mesure").optional({ nullable: true }).isDate().toDate(),
  body("date_protection_en_cours")
    .optional({ nullable: true })
    .isDate()
    .toDate(),
  body("tribunal_siret").not().isEmpty().trim().escape(),
  body("antenne_id").optional({ nullable: true }).toInt(10),
  body("cause_sortie")
    .optional({ nullable: true })
    .isIn(MESURE_PROTECTION.CAUSE_SORTIE.keys),
  body("resultat_revision")
    .optional({ nullable: true })
    .isIn(MESURE_PROTECTION.RESULTAT_REVISION.keys),
  check("etats.*.pays").isISO31661Alpha2(),
  check("etats.*.date_changement_etat").isDate().toDate(),
  check("etats.*.nature_mesure").isIn(MESURE_PROTECTION.NATURE_MESURE.keys),
  check("etats.*.lieu_vie").isIn(MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys),
  body("etats.*").custom(checkTypeEtablissement),
  body("etats.*.champ_mesure").custom(checkChampMesure),
];

const batchRules = [
  body("mesures.*.numero_rg").not().isEmpty().trim().escape(),
  body("mesures.*.annee_naissance").not().isEmpty().trim().escape(),
  body("mesures.*.civilite").isIn(MESURE_PROTECTION.CIVILITE.keys),

  body("mesures.*.date_nomination")
    .custom(checkDateNomination)
    .isDate()
    .toDate(),
  body("mesures.*.date_fin_mesure")
    .optional({ nullable: true })
    .isDate()
    .toDate(),
  body("mesures.*.date_premier_mesure")
    .optional({ nullable: true })
    .isDate()
    .toDate(),
  body("mesures.*.date_protection_en_cours")
    .optional({ nullable: true })
    .isDate()
    .toDate(),
  body("mesures.*.tribunal_siret").not().isEmpty().trim().escape(),
  body("mesures.*.antenne_id").optional({ nullable: true }).toInt(10),
  body("mesures.*.cause_sortie")
    .optional({ nullable: true })
    .isIn(MESURE_PROTECTION.CAUSE_SORTIE.keys),
  body("mesures.*.resultat_revision")
    .optional({ nullable: true })
    .isIn(MESURE_PROTECTION.RESULTAT_REVISION.keys),
  check("mesures.*.etats.*.pays").isISO31661Alpha2(),
  check("mesures.*.etats.*.date_changement_etat").isDate().toDate(),
  check("mesures.*.etats.*.nature_mesure").isIn(
    MESURE_PROTECTION.NATURE_MESURE.keys
  ),
  check("mesures.*.etats.*.lieu_vie").isIn(
    MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys
  ),
  body("mesures.*.etats.*").custom(checkTypeEtablissement),
  body("mesures.*.etats.*.champ_mesure").custom(checkChampMesure),
];

module.exports = {
  rules,
  batchRules,
};

function checkChampMesure(value, { req }) {
  if (req.body.etats && req.body.etats.length) {
    const { nature_mesure } = req.body.etats[req.body.etats.length - 1];
    if (
      (nature_mesure === "curatelle_simple" ||
        nature_mesure === "curatelle_renforcee" ||
        nature_mesure === "curatelle_renforcee") &&
      !value
    ) {
      throw new Error("champ_mesure is required");
    }

    if (value && !MESURE_PROTECTION.CHAMP_MESURE.keys.includes(value)) {
      throw new Error(
        `champ_mesure must be equal to ${MESURE_PROTECTION.CHAMP_MESURE.keys.join(
          " or "
        )}`
      );
    }
  }
  return true;
}

function checkTypeEtablissement(value) {
  if (
    value.lieu_vie === "etablissement" ||
    value.lieu_vie === "etablissement_conservation_domicile"
  ) {
    if (!value.type_etablissement) {
      throw new Error("type_etablissement is required");
    } else if (
      !MESURE_PROTECTION.TYPE_ETABLISSEMENT.keys.includes(
        value.type_etablissement
      )
    ) {
      throw new Error("type_etablissement is not valid");
    }
  }
  return true;
}

function checkDateNomination(value, { req }) {
  if (value) {
    if (
      req.body.date_premier_mesure &&
      isBefore(
        parseISO(`${value}T00:00:00.000Z`),
        parseISO(`${req.body.date_premier_mesure}T00:00:00.000Z`)
      )
    ) {
      throw new Error(
        "date_nomination must be after or equivalent to date_premier_mesure"
      );
    }

    if (
      req.body.date_protection_en_cours &&
      isBefore(
        parseISO(`${req.body.date_protection_en_cours}T00:00:00.000Z`),
        parseISO(`${value}T00:00:00.000Z`)
      )
    ) {
      throw new Error(
        "date_nomination must be before or equivalent to date_protection_en_cours"
      );
    }
  }

  if (req.body.etats && req.body.etats.length) {
    const lastEtat = req.body.etats[req.body.etats.length - 1];
    if (lastEtat) {
      if (
        lastEtat.date_changement_etat &&
        isBefore(
          parseISO(`${lastEtat.date_changement_etat}T00:00:00.000Z`),
          parseISO(`${value}T00:00:00.000Z`)
        )
      ) {
        throw new Error(
          "date_nomination must be before or equivalent to date_changement_etat"
        );
      }
    }
  }

  return value;
}
