const DIRECTION_TYPE = require("../keys");

function isDirectionTypeNational(direction) {
  return direction.type === DIRECTION_TYPE.national;
}

function isDirectionTypeRegional(direction) {
  return direction.type === DIRECTION_TYPE.regional;
}

function isDirectionTypeDepartemental(direction) {
  return direction.type === DIRECTION_TYPE.departemental;
}

module.exports = {
  isDirectionTypeDepartemental,
  isDirectionTypeNational,
  isDirectionTypeRegional,
};
