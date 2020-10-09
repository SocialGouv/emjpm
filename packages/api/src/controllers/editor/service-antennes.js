const { ServiceAntenne } = require("../../models/ServiceAntenne");
const { ServiceMember } = require("../../models/ServiceMember");

const getAntennes = async (req, res) => {
  const {
    locals: {
      oauth: { token },
    },
  } = res;
  const {
    user: { id: user_id },
  } = token;

  const antennes = await ServiceAntenne.query().whereIn(
    "service_id",
    ServiceMember.query().select("service_id").where("user_id", user_id)
  );

  return res.status(200).json({
    antennes: antennes.map((antenne) => {
      return {
        id: antenne.id,
        nom: antenne.name,
        adresse: antenne.address_street,
        code_postal: antenne.address_zip_code,
        ville: antenne.address_city,
      };
    }),
  });
};

module.exports = { getAntennes };
