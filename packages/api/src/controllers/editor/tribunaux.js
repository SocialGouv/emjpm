const { Tis } = require("../../models/Tis");

const getTribunaux = async (req, res) => {
  const tribunaux = await Tis.query().where("immutable", true);

  return res.status(200).json({
    tribunaux: tribunaux.map((tribunal) => {
      return {
        nom: tribunal.etablissement,
        code_postal: tribunal.code_postal,
        ville: tribunal.ville,
        siret: tribunal.siret,
        address: tribunal.address,
        latitude: tribunal.latitude,
        longitude: tribunal.longitude,
      };
    }),
  });
};

module.exports = { getTribunaux };
