const { ServiceAntenne } = require("../../../model/ServiceAntenne");
const { ServiceTis } = require("../../../model/ServiceTis");
const { ServiceAdmin } = require("../../../model/ServiceAdmin");
const { UserAntenne } = require("../../../model/UserAntenne");

exports.createServiceTis = async (body, service_id) => {
  const { tis } = body;
  if (!tis || tis.length === 0) {
    return true;
  }
  Promise.all(
    tis.map(ti_id =>
      ServiceTis.query()
        .allowInsert("[service_id, ti_id]")
        .insert({
          service_id: service_id,
          ti_id
        })
    )
  );
};

exports.createUserAntenne = async (userId, antennes) => {
  if (antennes.length == 0 || !userId) {
    return true;
  }
  Promise.all(
    antennes.map(antenne => {
      return UserAntenne.query()
        .allowInsert("[user_id,antenne_id]")
        .insert({
          user_id: userId,
          antenne_id: antenne.id
        });
    })
  );
};

exports.createServiceAdmin = async (userId, serviceId) => {
  if (serviceId && userId) {
    return ServiceAdmin.query()
      .allowInsert("[user_id,antenne_id]")
      .insert({
        user_id: userId,
        service_id: serviceId
      });
  }
};

exports.getServiceAntennesByService = async service_id => {
  return ServiceAntenne.query().where({ service_id });
};
