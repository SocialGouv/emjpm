const { format } = require("date-fns");
const { sendEmail } = require(".");

const EMAIL_RESERVATION_TEXT = (ti, user, mesure) =>
  `Madame, Monsieur,

  Pour information, le ${ti.etablissement} ${(mesure.cabinet &&
    `cabinet ${mesure.cabinet},`) ||
    ""} a décidé de vous confier une nouvelle mesure :
  - "type de mesure": ${mesure.type}
  - "genre": ${mesure.civilite}
  - "année de naissance": ${mesure.annee}.

  Quand cette dernière vous sera officiellement notifiée, nous vous invitons à mettre à jour vos mesures en cours.

  Pour rappel, à ce jour, vous avez déclaré "${
    user.mesures_en_cours
  }" mesures pour une capacité souhaitée de "${user.dispo_max}" mesures .

  À bientôt

  L’équipe e-mjpm.`;

const EMAIL_RESERVATION_HTML = (ti, user, mesure) =>
  `Madame, Monsieur,
<br><br>
  Pour information, le ${ti.etablissement} ${(mesure.cabinet &&
    `cabinet ${mesure.cabinet},`) ||
    ""} a décidé de vous confier une nouvelle mesure :
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
    user.mesures_en_cours
  }" mesures pour une capacité souhaitée de "${user.dispo_max}" mesures.
<br><br>
${
  mesure.is_urgent
    ? `
Le magistrat a précisé le caractère urgent lors de la réservation de cette mesure. La date prévisionnelle du jugement est le ${format(
        mesure.judgment_date,
        "DD/MM/YYYY"
      )}.`
    : null
}
<br><br>
  À bientôt
<br><br>
L’équipe e-mjpm.`;

const reservationEmail = async (ti, mesure, user) => {
  sendEmail(
    user.email,
    "e-MJPM : une nouvelle mesure vous a été attribuée",
    EMAIL_RESERVATION_TEXT(ti, user, mesure),
    EMAIL_RESERVATION_HTML(ti, user, mesure)
  ).catch(e => {
    /* eslint-disable no-console */
    console.log(e);
    /* eslint-enable no-console */
  });
};

module.exports = {
  reservationEmail
};
