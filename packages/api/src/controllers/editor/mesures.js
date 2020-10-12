const { Mesure } = require("../../models/Mesure");
const { sanitizeMesureProperties } = require("../../utils/mesure");

const mesures = async (req, res) => {
  const {
    query: { status },
  } = req;

  const serviceOrMandataire = req.serviceOrMandataire;
  const type = req.type;

  const filter = { [`${type}_id`]: serviceOrMandataire.id };
  if (status) {
    filter.status = status;
  }

  const mesures = await Mesure.query()
    .withGraphFetched("[etats,ressources, tis]")
    .where(filter);

  return res.status(200).json({
    mesures: mesures.map((m) => sanitizeMesureProperties(m)),
  });
};

module.exports = mesures;
