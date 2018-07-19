const express = require("express");
const pkg = require("../package.json");
const router = express.Router();
const queries = require("../db/queries");
var csv = require("csvjson");
// var fs = require("fs");
const mailer = require("express-mailer");
const { format, addMonths, addDays } = require("date-fns");
const app = express();

const nodemailer = require("nodemailer");

// router.post("/upload", function(req, res, next) {
//   const file = fs.readFileSync("./test1.csv", "utf8");
//   const dataObj = csv.toObject(file);
//   queries
//     .uploadAll(dataObj)
//     .then(() => {
//       console.log("Import data done!");
//     })
//     .catch(() => {
//       console.log("Import data failed");
//     });
// });

/* GET home page. */

// function loggedIn(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     res.redirect("http://localhost:3000/login");
//   }
// }

// router.get("/loginIn", function(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     res.redirect("http://localhost:3000/login");
//   }
// });
router.use("/mandataires", require("./mandataires"));
router.use("/mesures", require("./mesures"));
router.use("/inscription", require("./inscription"));
router.use("/admin", require("./admin"));

// router.post("/services", function(req, res, next) {
//   queries
//     .getAllServices(req.body)
//     .then(function(services) {
//       res.status(200).json(services);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

router.get("/ping", function(req, res, next) {
  if (!req.user) {
    res.status(401).json({ success: false });
  } else {
    res.json({ success: true });
  }
});

router.get("/", function(req, res, next) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: process.env.NODE_ENV || "development"
  });
});

// let transporter = nodemailer.createTransport({
//   host: "in-v3.mailjet.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "6632cabd2873712b0bafdf60d0693003",
//     pass: "5e65d90fbf59644d075ccf48e2b0ad30"
//   }
// });
// let mailOptions = {
//   from: "gonzalez_ad@hotmail.com", // sender address
//   to: "adrienutbm@gmail.com", // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>" // html body
// };
// router.get("/email", function(req, res, next) {
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.send("There was an error sending the email");
//       return;
//     }
//     res.send("Email Sent");
//   });
// });

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
router.get("/email", function(req, res, next) {
  queries
    .getMandataires()
    .then(mandataires => res.status(200).json(mandataires))
    .then(mandataires =>
      mandataires.map(mandataire => {
        if (
          format(addMonths(new Date(mandataire.email_send), 1), "MM/DD/YYYY") <
            format(new Date(Date.now()), "MM/DD/YYYY") &&
          format(addDays(new Date(mandataire.updateMesure), 15), "MM/DD/YYYY") <
            format(new Date(Date.now()), "MM/DD/YYYY")
        ) {
          let transporter = nodemailer.createTransport({
            host: "in-v3.mailjet.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "6632cabd2873712b0bafdf60d0693003",
              pass: "5e65d90fbf59644d075ccf48e2b0ad30"
            }
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: "gonzalez_ad@hotmail.fr", // sender address
            to: "adrienutbm@gmail.com , gonzalez_ad@hotmail.fr", // list of receivers
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
            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
        }
      })
    )
    .catch(error => next(error));
});

// router.get("/email", function(req, res, next) {
//   res.mailer.send(
//     "email",
//     {
//       to: "adrienutbm@gmail.com", // REQUIRED. This can be a comma delimited string just like a normal email to field.
//       subject: "Test Email", // REQUIRED.
//       otherProperty: "Other Property" // All additional properties are also passed to the template as local variables.
//     },
//     function(err) {
//       console.log("e", err);
//       if (err) {
//         // handle error
//         console.log(err);
//         res.send("There was an error sending the email");
//         return;
//       }
//       res.send("Email Sent");
//     }
//   );
// });
module.exports = router;
