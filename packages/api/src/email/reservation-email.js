const sentry = require("~/utils/sentry");
const logger = require("~/utils/logger");
const { mesureFormatter } = require("@emjpm/biz");
const { sendEmail } = require(".");

const EMAIL_RESERVATION_TEXT = (ti = {}, user, mesure) =>
  `Madame, Monsieur,

  Pour information, le ${ti.etablissement} ${
    (mesure.cabinet && `cabinet ${mesure.cabinet},`) || ""
  } a décidé de vous confier une nouvelle mesure :
  - nature de la mesure: ${mesureFormatter.formatNatureMesure(
    mesure.nature_mesure
  )}
  - champ de la mesure de protection: ${mesureFormatter.formatChampMesure(
    mesure.champ_mesure
  )}
  - civilité: ${mesure.civilite}
  - année de naissance: ${mesure.annee_naissance}
  ${
    mesure.judgment_date
      ? `- date prévisionnelle du jugement: ` +
        mesureFormatter.formatJudgmentDate(mesure.judgment_date)
      : ""
  }

  Quand cette dernière vous sera officiellement notifiée, nous vous invitons à mettre à jour vos mesures en cours.

  Pour rappel, à ce jour, vous avez déclaré "${
    user.mesures_en_cours
  }" mesures pour une capacité souhaitée de "${user.dispo_max}" mesures .

  ${
    mesure.is_urgent
      ? `
  Le magistrat a précisé le caractère urgent lors de la réservation de cette mesure.`
      : ""
  }

  À bientôt

  L’équipe e-mjpm.`;

const EMAIL_RESERVATION_HTML = (ti, user, mesure) =>
  `Madame, Monsieur,
<br><br>
  Pour information, le ${ti.etablissement} ${
    (mesure.cabinet && `cabinet ${mesure.cabinet},`) || ""
  } a décidé de vous confier une nouvelle mesure :
  <br>
  - nature de la mesure: ${mesureFormatter.formatNatureMesure(
    mesure.nature_mesure
  )}
  <br>
  - champ de la mesure de protection: ${mesureFormatter.formatChampMesure(
    mesure.champ_mesure
  )}
  <br>
  - civilité: ${mesure.civilite}
  <br>
  - année de naissance: ${mesure.annee_naissance}.
  ${
    mesure.judgment_date
      ? `
      <br>
      - date prévisionnelle du jugement: ` +
        mesureFormatter.formatJudgmentDate(mesure.judgment_date)
      : ""
  }
<br><br>
    Quand cette dernière vous sera officiellement notifiée, nous vous invitons à mettre à jour vos mesures en cours.
<br><br>
  Pour rappel, à ce jour, vous avez déclaré "${
    user.mesures_en_cours
  }" mesures pour une capacité souhaitée de "${user.dispo_max}" mesures.

${
  mesure.is_urgent
    ? `
  <br><br>
Le magistrat a précisé le caractère urgent lors de la réservation de cette mesure.`
    : ""
}
<br><br>
  À bientôt
<br><br>
L’équipe e-mjpm.`;

const reservationEmail = async (ti = {}, mesure, user) => {
  try {
    await sendEmail(
      user.email,
      "e-MJPM : une nouvelle mesure vous a été attribuée",
      EMAIL_RESERVATION_TEXT(ti, user, mesure),
      EMAIL_RESERVATION_HTML(ti, user, mesure)
    );
  } catch (error) {
    sentry.captureException(error);
    logger.error(error);
  }
};

module.exports = {
  reservationEmail,
};
