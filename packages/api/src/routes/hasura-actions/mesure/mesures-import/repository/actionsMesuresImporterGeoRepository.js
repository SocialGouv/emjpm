const {
  GeolocalisationCodePostal,
} = require("../../../../../models/GeolocalisationCodePostal");
const getRegionCode = require("../../../../../utils/getRegionCode");
const { Department } = require("../../../../../models/Departments");

const getGeoDatas = async (code_postal, ville) => {
  if (!code_postal) {
    return {};
  }
  if (!ville) {
    return {};
  }
  const geoDatas = await GeolocalisationCodePostal.query().where({
    code_postal,
  });
  if (!geoDatas.length) {
    return {};
  }
  let geoData = geoDatas.find((el) => el.ville === ville.toUpperCase().trim());
  if (!geoData) {
    geoData = geoDatas[0];
  }
  return geoData;
};

const findDepartmentFromPostalCode = async (
  code_postal,
  departmentByRegionCode
) => {
  let department = null;
  let regionCode = null;
  if (code_postal && code_postal.length === 5) {
    regionCode = getRegionCode(code_postal);
    department = departmentByRegionCode[regionCode];
    if (!department) {
      department = await Department.query().findOne({
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
    department = await Department.query().findById(department_id);
  }
  if (department) {
    departmentById[department.id] = department;
    departmentByRegionCode[regionCode] = department;
  }
  return department;
}

const actionsMesuresImporterGeoRepository = {
  getGeoDatas,
  findDepartment,
};

module.exports = actionsMesuresImporterGeoRepository;
