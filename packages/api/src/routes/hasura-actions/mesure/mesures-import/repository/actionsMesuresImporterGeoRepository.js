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

async function findDepartment({ code_postal, cache: { departmentByCode } }) {
  // eslint-disable-next-line prefer-const
  let { department, departementCode } = await findDepartmentFromPostalCode(
    code_postal,
    departmentByCode
  );
  if (department) {
    departmentByCode[departementCode] = department;
  }
  return department;
}

const actionsMesuresImporterGeoRepository = {
  findDepartment,
  getGeoDatas,
};

module.exports = actionsMesuresImporterGeoRepository;
