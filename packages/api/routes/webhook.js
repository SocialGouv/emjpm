const express = require("express");

const router = express.Router();
const { ServiceAntenne } = require("../model/ServiceAntenne");
const { Mandataire } = require("../model/Mandataire");
const { Tis } = require("../model/Tis");
const { reservationEmail } = require("../email/reservation-email");

const getUser = (headquarter, mandataire) => {
  if (mandataire) {
    return {
      mesures_en_cours: mandataire.mesures_en_cours,
      dispo_max: mandataire.dispo_max,
      email: "test@gmail.com"
    };
  } else if (headquarter) {
    return {
      mesures_en_cours: headquarter.mesures_in_progress,
      dispo_max: headquarter.mesures_max,
      email: "test@gmail.com"
    };
  }
  return null;
};

router.post("/mesure-reservation", async function(req, res) {
  const newMesure = req.body.event.data.new;
  const { ti_id, antenne_id, mandataire_id } = newMesure;
  const antennes = await ServiceAntenne.query().where("id", antenne_id);
  const [headquarter] = antennes.filter(
    antenne => antenne.headquarters === true
  );
  const [currentTi] = await Tis.query().where("id", ti_id);
  const [mandataire] = await Mandataire.query().where("id", mandataire_id);
  const user = getUser(headquarter, mandataire);
  if (currentTi) {
    reservationEmail(currentTi, newMesure, user);
  } else {
    res.json({ success: true });
  }
  res.json({ success: true });
});

module.exports = router;
