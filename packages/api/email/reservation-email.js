const { sendEmail } = require(".");

const { getMandataireById } = require("../db/queries/mandataires");
const EMAIL_RESERVATION_TEXT = (ti, mandataire, mesure) =>
  `Madame, Monsieur,

  Pour information, le ${ti.etablissement} ${ti.cabinet && `cabinet ${ti.cabinet},` || ''} a décidé de vous confier une nouvelle mesure :
  - "type de mesure": ${mesure.type}
  - "genre": ${mesure.civilite}
  - "année de naissance": ${mesure.annee}.
   
  Quand cette dernière vous sera officiellement notifiée, nous vous invitons à mettre à jour vos mesures en cours.
  
  Pour rappel, à ce jour, vous avez déclaré "${
    mandataire.mesures_en_cours
  }" pour une capacité souhaitée de "${mandataire.dispo_max}".
  
  À bientôt

  L’équipe e-mjpm.`;

const EMAIL_RESERVATION_HTML = (ti, mandataire, mesure) =>
  `Madame, Monsieur,
<br><br>
  Pour information, le ${ti.etablissement} ${ti.cabinet && `cabinet ${ti.cabinet},` || ''} a décidé de vous confier une nouvelle mesure :
  <br>
  - "type de mesure": ${mesure.type}
  <br>
  - "genre": ${mesure.civilite}
  <br>
  - "année de naissance": ${mesure.annee}.
<br><br>
    Quand cette dernière vous sera officiellement notifiée, nous vous invitons à mettre à jour vos mesures en cours.
<br><br>
  Pour rappel, à ce jour, vous avez déclaré "${
    mandataire.mesures_en_cours
  }" pour une capacité souhaitée de "${mandataire.dispo_max}".
<br><br>
  À bientôt
<br><br>
L’équipe e-mjpm.`;

const reservationEmail = async (ti, mandataire_id, mesure) => {
  const mandataire = await getMandataireById(mandataire_id);
  sendEmail(
    mandataire.email,
    "e-MJPM : une nouvelle mesure vous a été attribuée",
    EMAIL_RESERVATION_TEXT(ti, mandataire, mesure),
    EMAIL_RESERVATION_HTML(ti, mandataire, mesure)
  ).catch(e => {
    console.log(e);
  });
};

module.exports = {
  reservationEmail
};
