const { Service } = require("~/models");

const getServiceIdBySiret = async (_req, res) => {
  console.log("Hello");
  const services = await Service.query();
  const servicesBySiret = {};
  for (const service of services) {
    servicesBySiret[service.siret] = service.id;
  }
  return res.status(200).json(servicesBySiret);
};

module.exports = { getServiceIdBySiret };
