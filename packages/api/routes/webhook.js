const express = require("express");

const router = express.Router();
const { Service } = require("../model/Service");
const { ServiceAdmin } = require("../model/ServiceAdmin");
const { Mandataire } = require("../model/Mandataire");
const { Tis } = require("../model/Tis");
const { User } = require("../model/User");
const { MesuresImport } = require("../model/MesuresImport");
const { Mesures } = require("../model/Mesures");
const { Department } = require("../model/Departments");
const { reservationEmail } = require("../email/reservation-email");
const { cancelReservationEmail } = require("../email/cancel-reservation-email");
const { validationEmail } = require("../email/validation-email");
const { mesuresImportEmail } = require("../email/mesures-import-email");

const { getRegionCode } = require("../util/DepartementUtil");

const { raw } = require("objection");

// ----------------------------------
// -------EMAIL ACCOUNT VALIDATION---
// ----------------------------------

router.post("/email-account-validation", function(req, res) {
  const newUser = req.body.event.data.new;
  const oldUser = req.body.event.data.old;
  if (newUser.active && !oldUser.active) {
    validationEmail(newUser.email, `${process.env.APP_URL}`);
  }
  res.json({ success: true });
});

// ----------------------------------
// ------------- EMAIL RESERVATION---
// ----------------------------------

const getUsers = async (mandataire_id, service_id) => {
  if (mandataire_id) {
    const [mandataire] = await Mandataire.query().where("id", mandataire_id);
    const [currentUser] = await User.query().where("id", mandataire.user_id);
    return [
      {
        mesures_en_cours: mandataire.mesures_en_cours,
        dispo_max: mandataire.dispo_max,
        email: currentUser.email
      }
    ];
  } else {
    const service = await Service.query().findById(service_id);
    const serviceAdmins = await ServiceAdmin.query().where(
      "service_id",
      service_id
    );
    const userIds = serviceAdmins.map(sa => sa.user_id);
    const users = await User.query().findByIds(userIds);
    return users.map(user => ({
      mesures_en_cours: service.mesures_in_progress,
      dispo_max: service.dispo_max,
      email: user.email
    }));
  }
};

router.post("/email-reservation", async function(req, res) {
  const newMesure = req.body.event.data.new;
  const { ti_id, service_id, mandataire_id, status } = newMesure;
  if (status === "Mesure en attente") {
    const [currentTi] = await Tis.query().where("id", ti_id);
    const users = await getUsers(mandataire_id, service_id);
    for (const user of users) {
      reservationEmail(currentTi, newMesure, user);
    }
  }
  res.json({ success: true });
});

// -----------------------------------------
// ------------- EMAIL CANCEL RESERVATION---
// -----------------------------------------

router.post("/email-cancel-reservation", async function(req, res) {
  const sessionVars = req.body.event.session_variables;
  const role = sessionVars["x-hasura-role"];
  const userId = sessionVars["x-hasura-user-id"];

  if (role === "ti" && userId) {
    const oldMesure = req.body.event.data.old;
    const { ti_id, service_id, mandataire_id, status } = oldMesure;
    if (status === "Mesure en attente") {
      const [currentTi] = await Tis.query().where("id", ti_id);
      const users = await getUsers(mandataire_id, service_id);
      for (const user of users) {
        cancelReservationEmail(currentTi, oldMesure, user);
      }
    }
  }
  res.json({ success: true });
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
  await Mandataire.query()
    .findById(mandataire_id)
    .patch({
      mesures_en_cours: mesures_en_cours ? mesures_en_cours.count : 0,
      mesures_en_attente: mesures_en_attente ? mesures_en_attente.count : 0
    });
};

// TODO(tglatt): move db queries in other file
const saveOrUpdateMesure = async (mesureDatas, importSummary) => {
  const regionCode = getRegionCode(mesureDatas.code_postal);
  const department = await Department.query().findOne({
    code: regionCode
  });
  if (!department) {
    importSummary.errors.push(
      `Aucun département ne correspond au code ${regionCode}`
    );
    return;
  }

  const ti = await Tis.query().findOne({
    siret: mesureDatas.tribunal_siret
  });
  if (!ti) {
    importSummary.errors.push(
      `Aucun tribunal ne correspond au SIRET ${mesureDatas.tribunal_siret}`
    );
    return;
  }

  const data = {
    date_ouverture: mesureDatas.date_ouverture,
    ville: mesureDatas.ville,
    type: mesureDatas.type,
    status: mesureDatas.status,
    code_postal: mesureDatas.code_postal,
    civilite: mesureDatas.civilite,
    annee: mesureDatas.annee,
    numero_rg: mesureDatas.numero_rg,
    numero_dossier: mesureDatas.numero_dossier,
    mandataire_id: mesureDatas.mandataire_id,
    residence: mesureDatas.residence,
    department_id: department.id,
    ti_id: ti ? ti.id : null
  };

  const [mesure] = await Mesures.query().where({
    numero_rg: data.numero_rg,
    ti_id: ti.id
  });
  if (!mesure) {
    await Mesures.query().insert(data);
    ++importSummary.creationNumber;
  } else if (mesure.mandataire_id === data.mandataire_id) {
    await Mesures.query()
      .findById(mesure.id)
      .patch(data);
    ++importSummary.updateNumber;
  } else {
    importSummary.errors.push(
      `La mesure avec le numéro RG ${mesure.numero_rg} et le tribunal de ${ti.ville} est gérée par un autre MJPM.`
    );
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

  const user = await User.query().findById(mesuresImport.user_id);

  const mandataire = await Mandataire.query().findOne({
    user_id: mesuresImport.user_id
  });
  if (!mandataire) {
    throw new Error(
      `mandataire with user_id ${mesuresImport.user_id} does not exist.`
    );
  }

  const importSummary = {
    creationNumber: 0,
    updateNumber: 0,
    errors: []
  };

  // save or update mesures
  for (const data of mesuresImport.content) {
    await saveOrUpdateMesure(
      {
        ...data,
        date_ouverture: toDate(data.date_ouverture),
        mandataire_id: mandataire.id,
        status: "Mesure en cours"
      },
      importSummary
    );
  }

  await updateMandataireMesureStates(mandataire.id);

  // mark mesures_import as completed
  await MesuresImport.query()
    .findById(importId)
    .patch({ status: "IMPORT", processed_at: new Date() });

  mesuresImportEmail(user.email, importSummary);

  res.json({ success: true });
});

module.exports = router;
