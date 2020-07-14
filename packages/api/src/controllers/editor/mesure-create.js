const { validationResult } = require("express-validator");

const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { Tis } = require("../../models/Tis");

const mesureCreate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors });
  }

  const {
    body,
    user: { user_id },
  } = req;

  let user;
  let serviceOrMandataire;
  let mesure;
  let tis;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ error: "User not found" });
  }

  try {
    tis = await Tis.query().where("siret", body.tribunal_siret).first();
    if (!tis) {
      throw "tribunal not found";
    }
  } catch (error) {
    return res.status(400).json({ error: "Siret does not valid" });
  }

  const type = user.type === "service" ? "service" : "mandataire";

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
  } catch (error) {
    return res.status(422).json({ error: `${type} not found` });
  }

  try {
    const lastEtat = body.etats ? body.etats[body.etats.length - 1] : null;

    const mesureToCreate = {
      [`${type}_id`]: serviceOrMandataire.id,
      reason_extinction: body.cause_sortie,
      extinction: body.date_fin_mesure,
      antenne_id: body.antenne_id,
      ti_id: tis ? tis.id : null,
      code_postal: body.code_postal,
      ville: null,
      etablissement: null,
      annee_naissance: body.annee_naissance,
      date_nomination: body.date_nomination.toISOString(),
      status: null,
      date_fin_mesure: body.date_fin_mesure,
      etablissement_id: null,
      numero_dossier: body.numero_dossier,
      cabinet: body.tribunal_cabinet,
      numero_rg: body.numero_rg,
      department_id: null,
      judgment_date: null,
      latitude: null,
      longitude: null,
      pays: lastEtat ? lastEtat.pays : null,
      magistrat_id: null,
      lieu_vie: lastEtat ? lastEtat.lieu_vie : null,
      type_etablissement: lastEtat ? lastEtat.type_etablissement : null,
      civilite: body.civilite,
      cause_sortie: body.cause_sortie,
    };

    mesure = await Mesure.query().insert(mesureToCreate);
    mesure.etats = [];

    if (body.etats) {
      for (const etat of body.etats) {
        const mesureEtat = await MesureEtat.query().insert({
          mesure_id: mesure.id,
          date_changement_etat: etat.date_changement_etat,
          nature_mesure: etat.nature_mesure,
          champ_protection: null,
          lieu_vie: etat.lieu_vie || "",
          code_postal: etat.code_postal || "",
          ville: etat.ville || "",
          pays: etat.pays || "",
          type_etablissement: etat.type_etablissement,
          etablissement_siret: etat.etablissement_siret || "",
        });
        mesure.etats.push(mesureEtat);
      }
    }
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(201).json({ mesure });
};

module.exports = mesureCreate;
