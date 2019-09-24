const { Service } = require("../../../model/Service");
const { Department } = require("../../../model/Departments");
const { ServiceAntenne } = require("../../../model/ServiceAntenne");
const { ServiceTis } = require("../../../model/ServiceTis");
const { ServiceAdmin } = require("../../../model/ServiceAdmin");
const { UserAntenne } = require("../../../model/UserAntenne");

exports.createService = async body => {
  const code_postal = body.code_postal;

  const department = await Department.query()
    .where("code", code_postal.substring(0, 2))
    .limit(1)
    .first();

  const department_id = department.id;

  return Service.query()
    .allowInsert(
      "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville,department_id]"
    )
    .insert({
      etablissement: body.etablissement,
      nom: body.nom,
      prenom: body.prenom,
      email: body.email,
      telephone: body.telephone,
      adresse: body.adresse,
      code_postal: body.code_postal,
      ville: body.ville,
      dispo_max: body.dispo_max,
      department_id
    });
};

exports.createServiceAntenne = async (body, service_id) =>
  ServiceAntenne.query().insert({
    headquarters: true,
    name: body.etablissement,
    contact_firstname: body.prenom,
    contact_lastname: body.nom,
    contact_email: body.email,
    contact_phone: body.telephone,
    address_street: body.adresse,
    address_zip_code: body.code_postal,
    address_city: body.ville,
    mesures_max: body.dispo_max,
    service_id: service_id
  });

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
