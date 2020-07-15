const { Mesure } = require("../../models/Mesure");

const mesure = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const mesure = await Mesure.query()
      .withGraphFetched("[etats]")
      .where("id", id)
      .first();

    if (!mesure) {
      return res.status(404).end();
    }
    return res.status(200).json(mesure);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = mesure;
