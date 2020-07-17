const { validationResult } = require("express-validator");

const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { Tis } = require("../../models/Tis");

const mesureUpdate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors });
  }

  const {
    body,
    params: { id },
    user: { user_id },
  } = req;
  let user;
  let serviceOrMandataire;
  let mesure;

  try {
    user = await User.query().findById(user_id);
  } catch (error) {
    return res.status(422).json({ error: "User not found" });
  }

  const type = user.type === "service" ? "service" : "mandataire";

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
  } catch (error) {
    return res.status(422).json({ error: `${type} not found` });
  }

  try {
    mesure = await Mesure.query()
      .where({ [`${type}_id`]: serviceOrMandataire.id })
      .findById(id);
  } catch (error) {
    return res.status(422).json({ error: "Mesure not found" });
  }

  try {
    let tis = null;
    if (body.tribunal_siret) {
      tis = await Tis.query().where("siret", body.tribunal_siret).first();
    }
    if (!tis) {
      throw "tribunal not found";
    }
    mesure.ti_id = tis.id;
  } catch (error) {
    return res.status(400).json({ error: "Siret does not valid" });
  }

  try {
    const etats = await MesureEtat.query().where({ mesure_id: id });

    for (const etat of body.etats) {
      const matchEtat = etats.find(
        (e) => e.date_changement_etat === etat.date_changement_etat
      );
      if (matchEtat) {
        await MesureEtat.query().where({ id: matchEtat.id }).patch(etat);
      } else {
        await MesureEtat.query().insert({ mesure_id: mesure.id, ...etat });
      }
    }

    const lastEtat = body.etats ? body.etats[body.etats.length - 1] : null;

    await Mesure.query()
      .where({ id: mesure.id })
      .patch({
        ...mesure,
        annee_naissance: body.annee_naissance,
        antenne_id: body.antenne_id || null,
        cabinet: body.tribunal_cabinet,
        cause_sortie: body.cause_sortie,
        champ_protection: lastEtat ? lastEtat.champ_protection : null,
        civilite: body.civilite,
        code_postal: lastEtat ? lastEtat.code_postal : null,
        date_fin_mesure: body.date_fin_mesure
          ? body.date_fin_mesure.toISOString()
          : null,
        date_nomination: body.date_nomination.toISOString(),
        lieu_vie: lastEtat ? lastEtat.lieu_vie : null,
        [`${type}_id`]: serviceOrMandataire.id,
        ville: lastEtat ? lastEtat.ville : null,
        date_premier_mesure: body.date_premier_mesure
          ? body.date_premier_mesure.toISOString()
          : null,
        date_protection_en_cours: body.date_protection_en_cours
          ? body.date_protection_en_cours.toISOString()
          : null,
        status: body.status,
        numero_dossier: body.numero_dossier,
        numero_rg: body.numero_rg,
        pays: lastEtat ? lastEtat.pays : null,
        type_etablissement: lastEtat ? lastEtat.type_etablissement : null,
        resultat_revision: body.resultat_revision,
      });

    mesure = await Mesure.query().where({ id }).first();
    mesure.etats = await MesureEtat.query().where({ mesure_id: id });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(200).json({ mesure });
};

module.exports = mesureUpdate;
