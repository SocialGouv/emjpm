const express = require("express");

const router = express.Router();
const { ServiceAntenne } = require("../model/ServiceAntenne");
const { Mandataire } = require("../model/Mandataire");
const { Tis } = require("../model/Tis");
const { User } = require("../model/User");
const { MesuresImport } = require("../model/MesuresImport");
const { Mesures } = require("../model/Mesures");
const { Department } = require("../model/Departments");
const { reservationEmail } = require("../email/reservation-email");

const { raw } = require("objection");

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

router.post("/email-reservation", async function(req, res) {
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

// ----------------------------------
// ------------- IMPORT--------------
// ----------------------------------

// TODO(tglatt): move db queries in other file
const updateMandataireMesureStates = async mandataire_id => {
  const counters = await Mesures.query()
    .where({
      mandataire_id
    })
    .groupBy("status")
    .select(raw("status, count(*)"));

  const mesures_en_cours = counters.find(
    counter => counter.status === "Mesure en cours"
  );
  const mesures_en_attente = counters.find(
    counter => counter.status === "Mesure en attente"
  );
  await Mandataire.query().patch({
    mesures_en_cours: mesures_en_cours ? mesures_en_cours.count : 0,
    mesures_en_attente: mesures_en_attente ? mesures_en_attente.count : 0
  });
};

// TODO(tglatt): move db queries in other file
const saveOrUpdateMesure = async mesureDatas => {
  const code = mesureDatas.code_postal.substring(0, 2);
  const department = await Department.query().findOne({
    code
  });
  if (!department) {
    throw new Error(`no departement found with code ${code}`);
  }
  const [mesure] = await Mesures.query().where({
    numero_rg: mesureDatas.numero_rg
  });
  if (!mesure) {
    await Mesures.query().insert(mesureDatas);
  } else {
    await Mesures.query()
      .findById(mesure.id)
      .patch(mesureDatas);
  }
};

const toDate = dateStr => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

router.post("/mesures-import", async function(req, res) {
  const importId = req.body.event.data.new.id;
  const mesuresImport = await MesuresImport.query().findById(importId);
  if (!mesuresImport) {
    throw new Error(`mesures_import with id ${importId} does not exist.`);
  }
  const mandataire = await Mandataire.query().findOne({
    user_id: mesuresImport.user_id
  });
  if (!mandataire) {
    throw new Error(
      `mandataire with user_id ${mesuresImport.user_id} does not exist.`
    );
  }

  // save or update mesures
  for (const data of mesuresImport.content) {
    await saveOrUpdateMesure({
      ...data,
      date_ouverture: toDate(data.date_ouverture),
      mandataire_id: mandataire.id,
      status: "Mesure en cours"
    });
  }

  await updateMandataireMesureStates(mandataire.id);

  // mark mesures_import as completed
  await MesuresImport.query()
    .findById(importId)
    .patch({ status: "IMPORT", processed_at: new Date() });

  res.json({ success: true });
});

module.exports = router;
