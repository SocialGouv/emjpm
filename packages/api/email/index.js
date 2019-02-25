const nodemailer = require("nodemailer");

const SMTP_HOST = process.env.SMTP_HOST || "127.0.0.1";
const SMTP_PORT = process.env.SMTP_PORT || "25";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;

const smtpConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "hilton5@ethereal.email",
    pass: "bKqAV1sWrFQbV9PegR"
  }
};

const sendEmail = (sendTo, subject, text, html) => {
  let transporter = nodemailer.createTransport(smtpConfig);
  let mailOptions = {
    from: "gonzalez_ad@hotmail.fr",
    to: sendTo,
    subject: subject,
    text: text,
    html: html
  };
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail
};
