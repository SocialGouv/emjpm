const sentry = require("~/utils/sentry");
const logger = require("~/utils/logger");
const { mesureFormatter, stdFormatter } = require("@emjpm/core");
const { sendEmail } = require(".");

const EMAIL_RESERVATION_TEXT = (ti, user, mesure) =>
  `Madame, Monsieur,

Le ${stdFormatter.formatDateUI(mesure.created_at)}, le ${ti.etablissement} ${
    (mesure.cabinet && `cabinet ${mesure.cabinet}`) || ""
  }, vous a confié une nouvelle mesure :
- "nature de la mesure": ${mesureFormatter.formatNatureMesure(
    mesure.nature_mesure
  )}
- "champ de la mesure de protection": ${mesureFormatter.formatChampMesure(
    mesure.champ_mesure
  )}
- "civilité": ${mesure.civilite}
- "année de naissance": ${mesure.annee_naissance}.

Cette dernière a été entre-temps annulée par le magistrat, ne vous sera pas notifiée et n'apparaît plus dans vos mesures en attente.
Pour rappel, à ce jour, vous avez déclaré prendre en charge "${
    user.mesures_en_cours
  }" mesures pour une capacité souhaitée de "${user.dispo_max}" mesures.

À bientôt

L’équipe e-mjpm.`;

const cancelReservationEmail = async (ti, mesure, user) => {
  try {
    await sendEmail(
      user.email,
      "e-MJPM : Annulation d'une reservation de mesure",
      EMAIL_RESERVATION_TEXT(ti, user, mesure)
    );
  } catch (error) {
    sentry.captureException(error);
    logger.error(error);
  }
};

module.exports = {
  cancelReservationEmail,
};
