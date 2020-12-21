const { ServiceAntenne } = require("~/models");
const { ServiceMember } = require("~/models");

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
        adresse: antenne.adresse,
        code_postal: antenne.code_postal,
        id: antenne.id,
        nom: antenne.name,
        ville: antenne.ville,
      };
    }),
  });
};

module.exports = { getAntennes };
