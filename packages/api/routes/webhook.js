const express = require("express");

const router = express.Router();
const { ServiceAntenne } = require("../model/ServiceAntenne");
const { Mandataire } = require("../model/Mandataire");
const { Tis } = require("../model/Tis");
const { User } = require("../model/User");
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

router.post("/mesures-import", async function(req, res) {
  // console.log(req.body.event.data.new.id);
  res.json({ success: true });
});

module.exports = router;
