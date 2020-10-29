const express = require("express");
const uid = require("rand-token").uid;
const { Service } = require("../../models/Service");
const {
  ServiceMemberInvitation,
} = require("../../models/ServiceMemberInvitation");
const {
  serviceMemberInvitationMail,
} = require("../../email/service-member-invitation-mail");
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
