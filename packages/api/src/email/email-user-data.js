const { Service } = require("../models/Service");
const { ServiceMember } = require("../models/ServiceMember");
const { Mandataire } = require("../models/Mandataire");
const { User } = require("../models/User");

const getEmailUserDatas = async (mandataire_id, service_id) => {
  if (mandataire_id) {
    const [mandataire] = await Mandataire.query().where("id", mandataire_id);
    const [currentUser] = await User.query().where("id", mandataire.user_id);
    return [
      {
        mesures_en_cours: mandataire.mesures_en_cours,
        dispo_max: mandataire.dispo_max,
        email: currentUser.email
      }
    ];
  } else {
    const service = await Service.query().findById(service_id);
    const serviceAdmins = await ServiceMember.query().where(
      "service_id",
      service_id
    );
    const userIds = serviceAdmins.map(sa => sa.user_id);
    const users = await User.query().findByIds(userIds);
    return users.map(user => ({
      mesures_en_cours: service.mesures_in_progress,
      dispo_max: service.dispo_max,
      email: user.email
    }));
  }
};

module.exports = {
  getEmailUserDatas
};
