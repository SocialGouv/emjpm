const express = require("express");
const pkg = require("../package.json");
const router = express.Router();
const queries = require("../db/queries");
var csv = require("csvjson");

// var fs = require("fs");
const { format, addMonths, addDays } = require("date-fns");
const app = express();
const nodemailer = require("nodemailer");

const SMTP_HOST = process.env.SMTP_HOST || "127.0.0.1";
const SMTP_PORT = process.env.SMTP_PORT || "25";
const SMTP_USER = process.env.SMTP_USER; //|| "6632cabd2873712b0bafdf60d0693003"
const SMTP_PASS = process.env.SMTP_PASS; //|| "5e65d90fbf59644d075ccf48e2b0ad30"

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
router.get("/", function(req, res, next) {
  queries
    .getAll()
    .then(mandataires =>
      mandataires.map(mandataire => {
        if (
          format(
            addMonths(new Date(mandataire.date_mesure_update), 1),
            "MM/DD/YYYY"
          ) < format(new Date(Date.now()), "MM/DD/YYYY") &&
          format(addDays(new Date(mandataire.email_send), 15), "MM/DD/YYYY") <
            format(new Date(Date.now()), "MM/DD/YYYY")
        ) {
          const smtpConfig = {
            host: SMTP_HOST,
            port: SMTP_PORT,
            // port: 1025,
            ignoreTLS: true,
            secure: false
          };
          if (SMTP_USER) {
            smtpConfig.auth = {
              user: SMTP_USER,
              pass: SMTP_PASS
            };
          }

          let transporter = nodemailer.createTransport(smtpConfig);

          /*{
    // host: "in-v3.mailjet.com",
    host: SMTP_HOST,
    port: SMTP_PORT,
    // port: 1025,
    ignoreTLS: true,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
        // "6632cabd2873712b0bafdf60d0693003",
      pass: SMTP_PASS,

      //  "5e65d90fbf59644d075ccf48e2b0ad30"

    }
  });*/

          // setup email data with unicode symbols
          let mailOptions = {
            from: "gonzalez_ad@hotmail.fr", // sender address
            to: `${mandataire.email}`, // list of receivers
            subject: "e-MJPM : actualisez vos données", // Subject line
            text: "e-MJPM : actualisez vos données", // plain text body
            html:
              "Bonjour,\n" +
              "\n" +
              "L'équipe \"e-mjpm\" constate que vous n'avez pas actualisé vos informations durant ces 30 derniers jours. Afin que les magistrats puissent connaître en temps réel votre activité et bénéficier d'un outil d'aide à la décision performant, nous vous prions de mettre à jour vos données. Vous pouvez directement vous connecter via ce lien : https://emjpm.num.social.gouv.fr/ \n" +
              "\n" +
              "Pour toute difficulté, n'hésitez pas à nous contacter :\n" +
              "\n" +
              "contact@emjpm.beta.gouv.fr\n" +
              "\n" +
              "En vous remerciant de votre précieuse collaboration.\n" +
              "\n" +
              "Bien à vous" // html body
          };
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
          });
        }
      })
    )
    .then(() => {
      res.json({ success: true });
    });
  // .catch(error => next(error));
});

module.exports = router;
