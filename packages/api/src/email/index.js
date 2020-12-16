const nodemailer = require("nodemailer");
const config = require("~/config");

const smtpHost = config.smtpHost;
const smtpPort = config.smtpPort;
const smtpUser = config.smtpUser;
const smtpPass = config.smtpPass;
const smtpFrom = config.smtpFrom;

const smtpConfig = {
  host: smtpHost,
  ignoreTLS: true,
  port: smtpPort,
  secure: false,
};

if (smtpUser) {
  smtpConfig.auth = {
    pass: smtpPass,
    user: smtpUser,
  };
}

const sendEmail = (sendTo, subject, text, html, bcc) => {
  const transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    bcc,
    from: smtpFrom,
    html,
    subject,
    text,
    to: sendTo,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
};
