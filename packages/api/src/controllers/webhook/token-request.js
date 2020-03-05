const {
  editorConfirmationEmail
} = require("../../email/editor-confirmation-email");
const {
  editorConfirmationAdminEmail
} = require("../../email/editor-confirmation-admin-email");

/**
 * Send confirmation email for the token requester and for the admin
 */

const tokenRequest = async (req, res) => {
  const {
    body: {
      event: {
        data: {
          new: { email, name }
        }
      }
    }
  } = req;
  editorConfirmationEmail(email);
  editorConfirmationAdminEmail(email, name);
  res.json({ success: true });
};

module.exports = tokenRequest;
