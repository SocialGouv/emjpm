const { Tis } = require("../../models/Tis");

const getTribunaux = async (req, res) => {
  const tribunaux = await Tis.query().where("immutable", true);

  return res.status(200).json({
    tribunaux: tribunaux.map((tribunal) => {
      return {
        address: tribunal.address,
        code_postal: tribunal.code_postal,
        latitude: tribunal.latitude,
        longitude: tribunal.longitude,
        nom: tribunal.etablissement,
        siret: tribunal.siret,
        ville: tribunal.ville,
      };
    }),
  });
};

module.exports = { getTribunaux };
