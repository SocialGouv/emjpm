const { Tis } = require("~/models/Tis");
const { Mesure } = require("~/models/Mesure");
const { isEnAttente } = require("~core");
const { getEmailUserDatas } = require("~/email/email-user-data");
const { cancelReservationEmail } = require("~/email/cancel-reservation-email");

module.exports = async function (req, res, next) {
  const { mesure_id } = req.body.input;

  try {
    const mesure = await Mesure.query().findById(mesure_id);
    const { ti_id, service_id, mandataire_id, status } = mesure;

    if (!isEnAttente({ status }))
      throw new Error(
        `Delete needs a mesure with en_attente status (The mesure_id ${mesure.id} has ${status} status)`
      );

    const nbDeleted = await Mesure.query().deleteById(mesure_id);

    if (nbDeleted === 0) return res.json({ success: false });

    const ti = await Tis.query().findById(ti_id);
    const users = await getEmailUserDatas(mandataire_id, service_id);
    const emails = users.map((user) =>
      cancelReservationEmail(ti, mesure, user)
    );

    Promise.all(emails);
  } catch (error) {
    return next(error);
  }

  res.json({ success: true });
};
