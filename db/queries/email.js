const knex = require("../knex.js");

const mandataireProfilNotUpdateEmail = () =>
  knex
    .table("mandataires")
    .select()
    .where(
      knex.raw(
        "(date_mesure_update < current_date - interval '1 months' or date_mesure_update is  null)  and (email_send < current_date - interval '15 days' or email_send is  null)"
      )
    );
// knex.raw(
//   "select * from mandataires where (date_mesure_update < current_date - interval '1 months' or date_mesure_update is  null)  and (email_send < current_date - interval '15 days' or email_send is  null);", [1]
// );

const updateMandataireMailSent = id =>
  knex
    .table("mandataires")
    .where({ id })
    .update({ email_send: new Date() });

module.exports = {
  mandataireProfilNotUpdateEmail,
  updateMandataireMailSent
};
