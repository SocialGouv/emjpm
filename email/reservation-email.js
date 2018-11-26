const { sendEmail } = require(".");

const { getMandataireByUserId } = require("../db/queries/mandataires");
const EMAIL_RESERVATION_TEXT = (ti, mandataire) =>
  `
Bonjour ${mandataire.nom + mandataire.prenom || mandataire.etablissement},

Une nouvelle mesure vous a été attribuée par le ${ti.etablissement} - ${
    ti.cabinet
  }

Rendez vous sur e-mjpm pour activer cette mesure.

A bientôt,
L'équipe e-mjpm
`;

const EMAIL_RESERVATION_HTML = (ti, mandataire) =>
  `
Bonjour ${mandataire.nom + mandataire.prenom || mandataire.etablissement},<br>
<br>
Une nouvelle mesure vous a été attribuée par le ${
    ti.etablissement
  } ${ti.cabinet || ""}
<br><br>
Rendez vous sur <a href="https://emjpm.num.social.gouv.fr/">e-mjpm</a> pour activer cette mesure.
<br><br>
A bientôt,<br>
L'équipe e-mjpm
`;

const reservationEmail = async (ti, mandataire_id) => {
  const mandataire = await getMandataireByUserId(mandataire_id);
  sendEmail(
    mandataire.email,
    "e-MJPM : une nouvelle mesure vous a été attribué",
    EMAIL_RESERVATION_TEXT(ti, mandataire),
    EMAIL_RESERVATION_HTML(ti, mandataire)
  ).catch(e => {
    console.log(e);
  });
};

module.exports = {
  reservationEmail
};
