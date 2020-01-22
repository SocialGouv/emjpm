const { ServiceMember } = require("../../../model/ServiceMember");

exports.createServiceMember = async (userId, serviceId) => {
  if (serviceId && userId) {
    return ServiceMember.query()
      .allowInsert("[user_id,service_id]")
      .insert({
        user_id: userId,
        service_id: serviceId
      });
  }
};
