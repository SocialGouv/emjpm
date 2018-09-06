const express = require("express");
const nodemailer = require("nodemailer");
const { format, addMonths, addDays } = require("date-fns");

const router = express.Router();

const SMTP_HOST = process.env.SMTP_HOST || "127.0.0.1";
const SMTP_PORT = process.env.SMTP_PORT || "25";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;

const smtpConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  ignoreTLS: true,
  secure: false
};

if (SMTP_USER) {
  smtpConfig.auth = {
    user: SMTP_USER,
    pass: SMTP_PASS
  };
}

const sendEmail = (sendTo, subject, text, html) =>
  new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport(smtpConfig);
    let mailOptions = {
      from: SMTP_FROM,
      to: sendTo,
      subject: subject,
      text: text,
      html: html
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(info);
    });
  });

module.exports = {
  sendEmail
};
