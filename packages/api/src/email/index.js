const nodemailer = require("nodemailer");
const configuration = require("../env");

const smtpHost = configuration.smtpHost;
const smtpPort = configuration.smtpPort;
const smtpUser = configuration.smtpUser;
const smtpPass = configuration.smtpPass;
const smtpFrom = configuration.smtpFrom;

const smtpConfig = {
  host: smtpHost,
  port: smtpPort,
  ignoreTLS: true,
  secure: false,
};

if (smtpUser) {
  smtpConfig.auth = {
    user: smtpUser,
    pass: smtpPass,
  };
}

const sendEmail = (sendTo, subject, text, html, bcc) => {
  const transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    from: smtpFrom,
    to: sendTo,
    subject,
    text,
    html,
    bcc,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
};
