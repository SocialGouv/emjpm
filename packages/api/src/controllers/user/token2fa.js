const { User } = require("~/models");
const { authenticator } = require("otplib");

/* not used, but keeped if needed in future */
const token2fa = async (req, res) => {
  const { email, token } = req.body;

  const user = await User.query().where({ email });
  const secret = user.secret_2fa;
  const isValid = authenticator.verify({ secret, token });

  if (!isValid) {
    return res.status(401).json({ error: "invalid 2fa token" });
  }

  return res.status(200).json({ success: true });
};

module.exports = token2fa;
