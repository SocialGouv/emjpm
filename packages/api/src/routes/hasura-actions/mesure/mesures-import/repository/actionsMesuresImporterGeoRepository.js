const { getDepartementCode } = require("@emjpm/core");
const getGeoDatas = require("../../../../../services/getGeoDatas");
const { Departement } = require("../../../../../models/Departement");

const findDepartmentFromPostalCode = async (
  code_postal,
  departmentByRegionCode
) => {
  let department = null;
  let regionCode = null;
  if (code_postal && code_postal.length === 5) {
    regionCode = getDepartementCode(code_postal);
    department = departmentByRegionCode[regionCode];
    if (!department) {
      department = await Departement.query().findOne({
        code: regionCode,
      });
    }
  }
  return { department, regionCode };
};

async function findDepartment({
  mandataire,
  service,
  code_postal,
  cache: { departmentById, departmentByRegionCode },
}) {
  const department_id = mandataire
    ? mandataire.department_id
    : service.department_id;

  // eslint-disable-next-line prefer-const
  let { department, regionCode } = await findDepartmentFromPostalCode(
    code_postal,
    departmentByRegionCode
  );
  if (!department) {
    department = departmentById[department_id];
  }
  if (!department) {
    department = await Departement.query().findById(department_id);
  }
  if (department) {
    departmentById[department.id] = department;
    departmentByRegionCode[regionCode] = department;
  }
  return department;
}

const actionsMesuresImporterGeoRepository = {
  findDepartment,
  getGeoDatas,
};

module.exports = actionsMesuresImporterGeoRepository;
