const express = require("express");

const router = express.Router();
const { ServiceAntenne } = require("../model/ServiceAntenne");
const { Mandataire } = require("../model/Mandataire");
const { Tis } = require("../model/Tis");
const { User } = require("../model/User");
const { MesuresImport } = require("../model/MesuresImport");
const { Mesures } = require("../model/Mesures");
const { reservationEmail } = require("../email/reservation-email");

const getUser = (headquarter, mandataire, currentUser) => {
  if (mandataire) {
    return {
      mesures_en_cours: mandataire.mesures_en_cours,
      dispo_max: mandataire.dispo_max,
      email: currentUser.email
    };
  } else if (headquarter) {
    return {
      mesures_en_cours: headquarter.mesures_in_progress,
      dispo_max: headquarter.mesures_max,
      email: headquarter.contact_email
    };
  }
  return null;
};

router.post("/mesure-reservation", async function(req, res) {
  const newMesure = req.body.event.data.new;
  const { ti_id, antenne_id, mandataire_id } = newMesure;
  const [currentTi] = await Tis.query().where("id", ti_id);
  if (currentTi) {
    const antennes = await ServiceAntenne.query().where("id", antenne_id);
    const [headquarter] = antennes.filter(
      antenne => antenne.headquarters === true
    );
    const [mandataire] = await Mandataire.query().where("id", mandataire_id);
    const [currentUser] = await User.query().where("id", mandataire.user_id);
    const user = getUser(headquarter, mandataire, currentUser);
    reservationEmail(currentTi, newMesure, user);
  } else {
    res.json({ success: true });
  }
});

const toDate = dateStr => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

router.post("/mesures-import", async function(req, res) {
  const importId = req.body.event.data.new.id;
  const mesuresImport = await MesuresImport.query().findById(importId);
  const mandataire = Mandataire.query().findOne({
    user_id: mesuresImport.user_id
  });
  const datas = mesuresImport.content;
  for (const data of datas) {
    const {
      date_ouverture,
      code_postal,
      residence,
      numero_rg,
      civilite,
      ville,
      annee,
      type
    } = data;
    const [mesure] = await Mesures.query().where({ numero_rg: numero_rg });
    // console.log(mesure);
    if (!mesure) {
      await Mesures.query().insert({
        date_ouverture: toDate(date_ouverture),
        code_postal,
        residence,
        numero_rg,
        civilite,
        ville,
        annee,
        type,
        mandataire_id: mandataire.id
      });
    } else {
      await Mesures.query()
        .findById(mesure.id)
        .patch({
          date_ouverture: toDate(date_ouverture),
          code_postal,
          residence,
          numero_rg,
          civilite,
          ville,
          annee,
          type,
          mandataire_id: mandataire.id
        });
    }
  }
  // console.log(content);
  res.json({ success: true });
});

module.exports = router;
