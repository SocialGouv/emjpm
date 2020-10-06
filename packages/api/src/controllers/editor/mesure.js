const { Mesure } = require("../../models/Mesure");
const { sanitizeMesureProperties } = require("../../utils/mesure");

const mesure = async (req, res) => {
  const {
    params: { id },
  } = req;

  const serviceOrMandataire = req.serviceOrMandataire;
  const type = req.type;

  try {
    const mesure = await Mesure.query()
      .withGraphFetched("[etats,ressources]")
      .where({ id: id, [`${type}_id`]: serviceOrMandataire.id })
      .first();

    if (!mesure) {
      return res.status(404).end();
    }

    return res.status(200).json(sanitizeMesureProperties(mesure));
  } catch (err) {
    return res.status(400).json({
      errors: [{ msg: "oups, something goes wrong. please contact support." }],
    });
  }
};

module.exports = mesure;
