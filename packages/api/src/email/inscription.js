const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = (nom, prenom, email, codePostal, type, tis) => `
Bonjour la super team emjpm :) ,

Nous avons reçu une nouvelle inscription de ${prenom} ${nom} , ${email} , ${codePostal},
agrée sur TI: ${tis} / qui exerce sur TI: ${tis}.

${
  type === "ti"
    ? `qui exerce sur le TI: ${tis || "Pas de Ti sélectionné"}.`
    : `agrée sur TI(s): ${tis || "Pas de Ti sélectionné"}.`
}

Merci de vérifier cette nouvelle demande et de la valider.

Bonne journée :)
`;

const EMAIL_RELANCE_HTML = (nom, prenom, email, codePostal, type, tis) => `
Bonjour la super team eMJPM :),<br />
Nous avons reçu une nouvelle inscription de ${prenom} ${nom} , ${email} , ${codePostal}, <br />

${
  type === "ti"
    ? `qui exerce sur le TI: ${tis || "Pas de Ti sélectionné"}.`
    : `agrée sur TI(s): ${tis || "Pas de Ti sélectionné"}.`
} <br />

Merci de vérifier cette nouvelle demande et de la valider.
<br /><br />
Bonne journée :)
`;

const inscriptionEmail = (nom, prenom, email, codePostal, type, tis) =>
  sendEmail(
    "support.emjpm@fabrique.social.gouv.fr",
    "Nouvelle inscription",
    EMAIL_RELANCE_TEXT(nom, prenom, email, codePostal, type, tis),
    EMAIL_RELANCE_HTML(nom, prenom, email, codePostal, type, tis)
  ).catch(e => {
    // todo: sentry
    /* eslint-disable no-console */
    console.log(e);
    /* eslint-enable no-console */
  });

module.exports = {
  inscriptionEmail
};
