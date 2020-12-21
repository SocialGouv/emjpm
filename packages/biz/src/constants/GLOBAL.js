const { buildKeys } = require("../utils/keysBuilder");

const GLOBAL = {
  COUNTRIES: buildKeys({
    BE: "Belgique",
    FR: "France",
  }),
};

module.exports = { GLOBAL };
