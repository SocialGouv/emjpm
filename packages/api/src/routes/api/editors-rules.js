const { body, check } = require("express-validator");
const { MESURE_PROTECTION } = require("@emjpm/core");
const isBefore = require("date-fns/isBefore");
const parseISO = require("date-fns/parseISO");

const rules = [
  body("numero_rg").not().isEmpty().trim().escape(),
  body("annee_naissance").not().isEmpty().trim().escape(),
  body("civilite").isIn(MESURE_PROTECTION.CIVILITE.keys),

  body("date_nomination")
    .custom((value, { req }) => {
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
    })
    .isDate()
    .toDate(),
  body("date_fin_mesure").optional().isDate().toDate(),
  body("date_premier_mesure").optional().isDate().toDate(),
  body("date_protection_en_cours").optional().isDate().toDate(),
  body("tribunal_siret").not().isEmpty().trim().escape(),
  body("antenne_id").optional().toInt(10),
  body("cause_sortie").optional().isIn(MESURE_PROTECTION.CAUSE_SORTIE.keys),
  body("resultat_revision")
    .optional()
    .isIn(MESURE_PROTECTION.RESULTAT_REVISION.keys),
  check("etats.*.pays").isISO31661Alpha2(),
  check("etats.*.date_changement_etat").isDate().toDate(),
  check("etats.*.nature_mesure").isIn(MESURE_PROTECTION.NATURE_MESURE.keys),
  check("etats.*.lieu_vie").isIn(MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys),

  body("etats.*").custom((value) => {
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
  }),

  body("etats.*.champ_mesure").custom((value, { req }) => {
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
  }),
];

module.exports = {
  rules,
};
