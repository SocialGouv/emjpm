function getDepartementCode(zipcode) {
  if (!zipcode || zipcode.length !== 5) {
    throw new Error("zip code is invalid");
  }
  if (zipcode.startsWith("20")) {
    // Corse
    return parseInt(zipcode) < 20200 ? "2A" : "2B";
  } else if (zipcode.startsWith("97") || zipcode.startsWith("98")) {
    // Dom-Tom
    return zipcode.substring(0, 3);
  } else {
    return zipcode.substring(0, 2);
  }
}

function findDepartementByCodeOrId(departements, { id, code }) {
  if (code) {
    return departements.find((elm) => elm.code === code) || {};
  }
  if (id) {
    return departements.find((elm) => elm.id === id) || {};
  }
  return {};
}

module.exports = {
  findDepartementByCodeOrId,
  getDepartementCode,
};
