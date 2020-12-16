const { getDepartementCode } = require("@emjpm/core");
const getGeoDatas = require("~/services/getGeoDatas");
const { Departement } = require("~/models/Departement");

const findDepartmentFromPostalCode = async (code_postal, departmentByCode) => {
  let department = null;
  let departementCode = null;
  if (code_postal && code_postal.length === 5) {
    departementCode = getDepartementCode(code_postal);
    department = departmentByCode[departementCode];
    if (!department) {
      department = await Departement.query().findOne({
        code: departementCode,
      });
    }
  }
  return { departementCode, department };
};

async function findDepartment({
  mandataire,
  service,
  code_postal,
  cache: { departmentById, departmentByCode },
}) {
  const department_id = mandataire
    ? mandataire.department_id
    : service.department_id;

  // eslint-disable-next-line prefer-const
  let { department, regionCode } = await findDepartmentFromPostalCode(
    code_postal,
    departmentByCode
  );
  if (!department) {
    department = departmentById[department_id];
  }
  if (!department) {
    department = await Departement.query().findById(department_id);
  }
  if (department) {
    departmentById[department.id] = department;
    departmentByCode[regionCode] = department;
  }
  return department;
}

const actionsMesuresImporterGeoRepository = {
  findDepartment,
  getGeoDatas,
};

module.exports = actionsMesuresImporterGeoRepository;
