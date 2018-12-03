const { sendEmail } = require(".");

const { getMandataireById } = require("../db/queries/mandataires");
const EMAIL_RESERVATION_TEXT = (ti, mandataire) =>
  `
Madame, Monsieur,

Pour information, le ${ti.etablissement}, cabinet ${ti.cabinet ||
    ""}, a décidé de vous confier une nouvelle mesure. Les détails de cette dernière sont d’ores et déjà disponibles sur <a href="https://emjpm.num.social.gouv.fr/">e-mjpm</a>, onglet « mesures en attente ».

Quand celle-ci vous sera officiellement notifiée par courrier, vous pourrez l’ajouter dans vos mesures en cours.

À bientôt

L’équipe e-mjpm
`;

const EMAIL_RESERVATION_HTML = (ti, mandataire) =>
  `
Madame, Monsieur,
<br><br>
Pour information, le ${ti.etablissement}, cabinet ${ti.cabinet ||
    ""}, a décidé de vous confier une nouvelle mesure. Les détails de cette dernière sont d’ores et déjà disponibles sur <a href="https://emjpm.num.social.gouv.fr/">e-mjpm</a>, onglet « mesures en attente ».
<br><br>
Quand celle-ci vous sera officiellement notifiée par courrier, vous pourrez l’ajouter dans vos mesures en cours.
<br><br>
À bientôt
<br><br>
L’équipe e-mjpm
`;

const reservationEmail = async (ti, mandataire_id) => {
  const mandataire = await getMandataireById(mandataire_id);
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
