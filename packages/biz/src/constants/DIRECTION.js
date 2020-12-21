const { buildKeys } = require("../utils/keysBuilder");

const DIRECTION = {
  DIRECTION_TYPE: buildKeys({
    departemental: "Direction départementale",
    national: "Direction nationale",
    regional: "Direction régionale",
  }),
};

module.exports = { DIRECTION };
