const { validationResult } = require("express-validator");

const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { Tis } = require("../../models/Tis");
const { Departement } = require("../../models/Departement");
const getRegionCode = require("../../utils/getRegionCode");

const mesureCreate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
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
    let tis = null;
    if (body.tribunal_siret) {
      tis = await Tis.query().where("siret", body.tribunal_siret).first();
    }
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

    let departementId = null;
    if (lastEtat && lastEtat.code_postal) {
      const regionCode = getRegionCode(lastEtat.code_postal);
      const departement = await Departement.query()
        .where({ code: regionCode })
        .first();
      departementId = departement.id;
    }

    const mesureToCreate = {
      annee_naissance: body.annee_naissance,
      antenne_id: body.antenne_id || null,
      cabinet: body.tribunal_cabinet,
      cause_sortie: body.cause_sortie,
      champ_mesure: lastEtat ? lastEtat.champ_mesure : null,
      civilite: body.civilite,
      code_postal: lastEtat ? lastEtat.code_postal : null,
      date_fin_mesure: body.date_fin_mesure
        ? body.date_fin_mesure.toISOString()
        : null,
      date_nomination: body.date_nomination.toISOString(),
      department_id: departementId,
      etablissement: null,
      etablissement_id: null,
      judgment_date: null,
      latitude: null,
      lieu_vie: lastEtat ? lastEtat.lieu_vie : null,
      longitude: null,
      [`${type}_id`]: serviceOrMandataire.id,
      ti_id: tis ? tis.id : null,
      ville: lastEtat ? lastEtat.ville : null,
      date_premier_mesure: body.date_premier_mesure
        ? body.date_premier_mesure.toISOString()
        : null,
      date_protection_en_cours: body.date_protection_en_cours
        ? body.date_protection_en_cours.toISOString()
        : null,
      status: "en_cours",
      numero_dossier: body.numero_dossier,
      numero_rg: body.numero_rg,
      pays: lastEtat ? lastEtat.pays : null,
      magistrat_id: null,
      type_etablissement: lastEtat ? lastEtat.type_etablissement : null,
      resultat_revision: body.resultat_revision,
    };

    mesure = await Mesure.query().insert(mesureToCreate);
    mesure.etats = [];

    if (body.etats) {
      for (const etat of body.etats) {
        const mesureEtat = await MesureEtat.query().insert({
          mesure_id: mesure.id,
          date_changement_etat: etat.date_changement_etat,
          nature_mesure: etat.nature_mesure,
          champ_protection: etat.champ_mesure,
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
    console.error("error", error.message);
    return res.status(422).json({ error: error.message });
  }

  return res.status(201).json(mesure);
};

module.exports = mesureCreate;
