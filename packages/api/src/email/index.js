const nodemailer = require("nodemailer");
const configuration = require("~/env");

const smtpHost = configuration.smtpHost;
const smtpPort = configuration.smtpPort;
const smtpUser = configuration.smtpUser;
const smtpPass = configuration.smtpPass;
const smtpFrom = configuration.smtpFrom;

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
