const { MesureEtat } = require("~/models");

const updateCurrentDataOfMesure = require("./updateCurrentDataOfMesure");

module.exports = async (req, res) => {
  const { id, mesure_id } = req.body.input;

  const result = await MesureEtat.query().delete().where({ id, mesure_id });

  await updateCurrentDataOfMesure(mesure_id);

  return res.json({
    affectedRows: result,
  });
};
