const { MesureEtat } = require("../../../../models/MesureEtat");

const updateCurrentDataOfMesure = require("./updateCurrentDataOfMesure");

module.exports = async (req, res) => {
  const {
    champ_mesure,
    code_postal,
    date_changement_etat,
    id,
    lieu_vie,
    mesure_id: mesureId,
    nature_mesure,
    pays,
    type_etablissement,
    ville,
  } = req.body.input;

  let mesureEtatId = id;

  const datas = {
    champ_mesure,
    code_postal,
    date_changement_etat,
    lieu_vie,
    mesure_id: mesureId,
    nature_mesure,
    pays,
    type_etablissement,
    ville,
  };

  if (!id) {
    const { id: etatId } = await MesureEtat.query().insertAndFetch(datas);
    mesureEtatId = etatId;
  } else {
    await MesureEtat.query().update(datas).where({ id: mesureEtatId });
  }

  await updateCurrentDataOfMesure(mesureId);

  return res.json({
    id: mesureEtatId,
    mesure_id: mesureId,
  });
};
