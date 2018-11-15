const knex = require("../knex.js");

const mandataireProfilNotUpdateEmail = () =>
  knex
    .table("mandataires")
    .select()
    .where(
      knex.raw(
        // pas de MAJ mesure depuis au moins un mois
        // ET
        // pas d'email envoyé depuis au moins 15 jours
        `(date_mesure_update < current_date - interval '1 months' or date_mesure_update is null)
        and
        (email_send < current_date - interval '15 days' or email_send is null)`
      )
    );

const updateMandataireMailSent = id =>
  knex
    .table("mandataires")
    .where({ id })
    .update({ email_send: new Date() });

module.exports = {
  mandataireProfilNotUpdateEmail,
  updateMandataireMailSent
};
