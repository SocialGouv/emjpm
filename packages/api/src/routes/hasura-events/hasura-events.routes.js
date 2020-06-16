const express = require("express");
const uid = require("rand-token").uid;
const { Service } = require("../../models/Service");
const {
  ServiceMemberInvitation,
} = require("../../models/ServiceMemberInvitation");
const { Tis } = require("../../models/Tis");
const { reservationEmail } = require("../../email/reservation-email");
const {
  cancelReservationEmail,
} = require("../../email/cancel-reservation-email");
const { validationEmail } = require("../../email/validation-email");
const {
  serviceMemberInvitationMail,
} = require("../../email/service-member-invitation-mail");
const { getEmailUserDatas } = require("../../email/email-user-data");
const {
  editorConfirmationEmail,
} = require("../../email/editor-confirmation-email");
const {
  editorConfirmationAdminEmail,
} = require("../../email/editor-confirmation-admin-email");
// ----------------------------------
// -------EMAIL ACCOUNT VALIDATION---
// ----------------------------------

const router = express.Router();

router.post("/token-request", function (req, res) {
  const {
    body: {
      event: {
        data: {
          new: { email, name },
        },
      },
    },
  } = req;
  editorConfirmationEmail(email);
  editorConfirmationAdminEmail(email, name);
  res.json({ success: true });
});

router.post("/email-account-validation", function (req, res) {
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

router.post("/email-reservation", async function (req, res) {
  const mesure = req.body.event.data.new;
  const { ti_id, service_id, mandataire_id, status } = mesure;

  if (status === "Mesure en attente") {
    const ti = await Tis.query().findById(ti_id);
    const users = await getEmailUserDatas(mandataire_id, service_id);
    const emails = users.map((user) => reservationEmail(ti, mesure, user));

    await Promise.all(emails);
  }

  res.json({ success: true });
});

// -----------------------------------------
// ------------- EMAIL CANCEL RESERVATION---
// -----------------------------------------

router.post("/email-cancel-reservation", async function (req, res) {
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

router.post("/email-service-member-invitation", async function (req, res) {
  const invitation = req.body.event.data.new;

  const serviceMemberInvitation = await ServiceMemberInvitation.query().patchAndFetchById(
    invitation.id,
    {
      sent_at: new Date(),
      token: uid(32),
    }
  );

  const service = await Service.query().findById(
    serviceMemberInvitation.service_id
  );

  serviceMemberInvitationMail(serviceMemberInvitation, service);

  res.json({ success: true });
});

module.exports = router;
