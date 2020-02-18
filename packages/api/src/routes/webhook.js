const express = require("express");
const uid = require("rand-token").uid;

const router = express.Router();
const { Service } = require("../model/Service");
const { ServiceMember } = require("../model/ServiceMember");
const { ServiceMemberInvitation } = require("../model/ServiceMemberInvitation");
const { Mandataire } = require("../model/Mandataire");
const { Tis } = require("../model/Tis");
const { User } = require("../model/User");
const { MesuresImport } = require("../model/MesuresImport");
const {
  GeolocalisationCodePostal
} = require("../model/GeolocalisationCodePostal");
const { Mesures } = require("../model/Mesures");
const { Department } = require("../model/Departments");
const { reservationEmail } = require("../email/reservation-email");
const { cancelReservationEmail } = require("../email/cancel-reservation-email");
const { validationEmail } = require("../email/validation-email");
const { mesuresImportEmail } = require("../email/mesures-import-email");
const {
  serviceMemberInvitationMail
} = require("../email/service-member-invitation-mail");

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

const getEmailUserDatas = async (mandataire_id, service_id) => {
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
    const serviceAdmins = await ServiceMember.query().where(
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
    const users = await getEmailUserDatas(mandataire_id, service_id);
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
  if (sessionVars) {
    const role = sessionVars["x-hasura-role"];
    const userId = sessionVars["x-hasura-user-id"];

    const isTi = role && role === "ti";

    if (isTi && userId) {
      const oldMesure = req.body.event.data.old;
      const { ti_id, service_id, mandataire_id, status } = oldMesure;
      if (status === "Mesure en attente") {
        const [currentTi] = await Tis.query().where("id", ti_id);
        const users = await getEmailUserDatas(mandataire_id, service_id);
        for (const user of users) {
          cancelReservationEmail(currentTi, oldMesure, user);
        }
      }
    }
  }
  res.json({ success: true });
});

// ----------------------------------
// ------------- IMPORT--------------
// ----------------------------------

const countMesuresInState = (mesures, state) => {
  const fileredMesures = mesures.find(counter => counter.status === state);
  return fileredMesures ? fileredMesures.count : 0;
};

const getMesureStates = async (mandataire_id, service_id) => {
  return Mesures.query()
    .where({
      mandataire_id,
      service_id
    })
    .groupBy("status")
    .select(raw("status, count(*)"));
};

// TODO(tglatt): move db queries in other file
const updateServiceMesureStates = async service_id => {
  const counters = await getMesureStates(null, service_id);

  const mesures_in_progress = countMesuresInState(counters, "Mesure en cours");
  const mesures_awaiting = countMesuresInState(counters, "Mesure en attente");

  await Service.query()
    .findById(service_id)
    .patch({
      mesures_in_progress,
      mesures_awaiting
    });
};

// TODO(tglatt): move db queries in other file
const updateMandataireMesureStates = async mandataire_id => {
  const counters = await getMesureStates(mandataire_id, null);

  const mesures_en_cours = countMesuresInState(counters, "Mesure en cours");
  const mesures_en_attente = countMesuresInState(counters, "Mesure en attente");

  await Mandataire.query()
    .findById(mandataire_id)
    .patch({
      mesures_en_cours,
      mesures_en_attente
    });
};

const getMesureDepartment = async code_postal => {
  let department = null;
  if (code_postal) {
    const regionCode = getRegionCode(code_postal);
    department = await Department.query().findOne({
      code: regionCode
    });
  }
  return department;
};

const getGeoDatas = async (code_postal, ville) => {
  if (!code_postal) {
    return {};
  }
  const geoDatas = await GeolocalisationCodePostal.query().where({
    code_postal
  });
  if (!geoDatas.length) {
    return {};
  }
  let geoData = geoDatas.find(el => el.ville === ville.toUpperCase().trim());
  if (!geoData) {
    geoData = geoDatas[0];
  }
  return geoData;
};

// TODO(tglatt): move db queries in other file
const saveOrUpdateMesure = async (mesureDatas, importSummary) => {
  const mandataire = mesureDatas.mandataire;
  const service = mesureDatas.service;
  const department_id = mandataire
    ? mandataire.department_id
    : service.department_id;
  const code_postal = mesureDatas.code_postal;
  const ville = mesureDatas.ville;

  let department = await getMesureDepartment(code_postal, department_id);
  if (!department) {
    department = await Department.query().findById(department_id);
  }

  const { latitude, longitude } = await getGeoDatas(code_postal, ville);

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
    mandataire_id: mandataire ? mandataire.id : null,
    service_id: service ? service.id : null,
    residence: mesureDatas.residence,
    department_id: department.id,
    ti_id: ti ? ti.id : null,
    longitude,
    latitude
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

  let mandataire;
  let service;

  if (mesuresImport.user_id) {
    mandataire = await Mandataire.query().findOne({
      user_id: mesuresImport.user_id
    });
  } else if (mesuresImport.service_id) {
    service = await Service.query().findById(mesuresImport.service_id);
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
        mandataire,
        service,
        status: "Mesure en cours"
      },
      importSummary
    );
  }

  if (mandataire) {
    await updateMandataireMesureStates(mandataire.id);
  } else if (service) {
    await updateServiceMesureStates(service.id);
  }

  // mark mesures_import as completed
  await MesuresImport.query()
    .findById(importId)
    .patch({ status: "IMPORT", processed_at: new Date() });

  const userEmails = await getEmailUserDatas(
    mandataire ? mandataire.id : null,
    service ? service.id : null
  );

  for (const userEmail of userEmails) {
    mesuresImportEmail(userEmail, importSummary);
  }

  res.json({ success: true });
});

router.post("/email-service-member-invitation", async function(req, res) {
  const invitation = req.body.event.data.new;

  const serviceMemberInvitation = await ServiceMemberInvitation.query().patchAndFetchById(
    invitation.id,
    {
      sent_at: new Date(),
      token: uid(32)
    }
  );

  const service = await Service.query().findById(
    serviceMemberInvitation.service_id
  );

  serviceMemberInvitationMail(serviceMemberInvitation, service);

  res.json({ success: true });
});

module.exports = router;
