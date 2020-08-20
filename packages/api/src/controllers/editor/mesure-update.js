const { validationResult } = require("express-validator");

const { User } = require("../../models/User");
const { Mesure } = require("../../models/Mesure");
const { MesureEtat } = require("../../models/MesureEtat");
const { Tis } = require("../../models/Tis");
const { Departement } = require("../../models/Departement");
const { ServiceAntenne } = require("../../models/ServiceAntenne");
const { ServiceMember } = require("../../models/ServiceMember");
const {
  GeolocalisationCodePostal,
} = require("../../models/GeolocalisationCodePostal");
const getRegionCode = require("../../utils/getRegionCode");

async function antenneIdIsValid(antenneId, userId) {
  const antennes = await ServiceAntenne.query()
    .select("id")
    .whereIn(
      "service_id",
      ServiceMember.query().select("service_id").where("user_id", userId)
    );
  if (!antennes && !antennes.length) {
    return false;
  }
  return antennes.map(({ id }) => id).includes(antenneId);
}

async function tribunalSiretIsValid(siret) {
  const tis = await Tis.query().where("siret", siret).first();
  return !!tis;
}

const mesureUpdate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
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

  if (body.antenne_id) {
    const isValid = await antenneIdIsValid(body.antenne_id, user_id);
    if (!isValid) {
      return res.status(400).json({
        error: `antenne_id (${body.antenne_id}) does not match with your service.`,
      });
    }
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
    return res.status(422).json({ error: "mesure not found" });
  }

  if (body.tribunal_siret) {
    const isValid = await tribunalSiretIsValid(body.tribunal_siret);
    if (!isValid) {
      return res.status(400).json({ error: "siret is not valid" });
    }
  }

  try {
    const etats = await MesureEtat.query().where({ mesure_id: id });
    if (body.etats) {
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
    }

    const mesureToUpdate = {
      ...body,
      ti_id: mesure.ti_id,
      [`${type}_id`]: serviceOrMandataire.id,
    };

    const lastEtat = body.etats ? body.etats[body.etats.length - 1] : null;
    if (lastEtat) {
      if (lastEtat.code_postal) {
        const regionCode = getRegionCode(lastEtat.code_postal);
        const departement = await Departement.query()
          .where({ code: regionCode })
          .first();
        mesureToUpdate.department_id = departement.id;

        const geoloc = await GeolocalisationCodePostal.query()
          .where({ code_postal: lastEtat.code_postal })
          .first();
        if (geoloc) {
          mesureToUpdate.longitude = geoloc.longitude;
          mesureToUpdate.latitude = geoloc.latitude;
        }
      }

      mesureToUpdate.champ_protection = lastEtat.champ_protection;
      mesureToUpdate.code_postal = lastEtat.code_postal;
      mesureToUpdate.lieu_vie = lastEtat.lieu_vie;
      mesureToUpdate.ville = lastEtat.ville;
      mesureToUpdate.pays = lastEtat.pays;
      mesureToUpdate.type_etablissement = lastEtat.type_etablissement;
    }

    await Mesure.query().where({ id: mesure.id }).patch(mesureToUpdate);
    mesure = await Mesure.query().where({ id }).first();
    mesure.etats = await MesureEtat.query().where({ mesure_id: id });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  return res.status(200).json({ mesure });
};

module.exports = mesureUpdate;
