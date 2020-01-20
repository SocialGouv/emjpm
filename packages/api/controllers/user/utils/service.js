const { ServiceAntenne } = require("../../../model/ServiceAntenne");
const { ServiceTis } = require("../../../model/ServiceTis");
const { ServiceMember } = require("../../../model/ServiceMember");

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

exports.createServiceMember = async (userId, serviceId) => {
  if (serviceId && userId) {
    return ServiceMember.query()
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
