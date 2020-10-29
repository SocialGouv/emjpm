const express = require("express");
const { isEnAttente } = require("@emjpm/core");
const uid = require("rand-token").uid;

const { getEmailUserDatas } = require("../../../email/email-user-data");
const { reservationEmail } = require("../../../email/reservation-email");
const { validationEmail } = require("../../../email/validation-email");
const {
  serviceMemberInvitationMail,
} = require("../../../email/service-member-invitation-mail");
const { Service } = require("../../../models/Service");
const {
  ServiceMemberInvitation,
} = require("../../../models/ServiceMemberInvitation");
const { Tis } = require("../../../models/Tis");
const { Mesure } = require("../../../models/Mesure");

const router = express.Router();

router.post("/email-reservation", async function (req, res) {
  const { mesure_id } = req.body.input;

  const mesure = await Mesure.query().findById(mesure_id);
  const { ti_id, service_id, mandataire_id, status } = mesure;

  if (isEnAttente({ status })) {
    const ti = await Tis.query().findById(ti_id);
    const users = await getEmailUserDatas(mandataire_id, service_id);
    const emails = users.map((user) => reservationEmail(ti, mesure, user));

    await Promise.all(emails);
  }

  res.json({ success: true });
});

router.post("/email-account-validation", function (req, res) {
  const { user_email } = req.body.input;

  validationEmail(user_email, `${process.env.APP_URL}`);

  res.json({ success: true });
});

router.post("/email-service-member-invitation", async function (req, res) {
  const { invitation_id } = req.body.input;

  const serviceMemberInvitation = await ServiceMemberInvitation.query().patchAndFetchById(
    invitation_id,
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
