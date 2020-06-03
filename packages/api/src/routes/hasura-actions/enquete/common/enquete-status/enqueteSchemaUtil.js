const logger = require("../../../../../utils/logger");

async function getValidationStatus(data, schema, debugName) {
  if (isEmptyData(data, schema, debugName)) {
    return "empty";
  }
  const isValid = await schema.isValid(data);

  return isValid ? "valid" : "invalid";
}
function isEmptyData(data, schema, debugName) {
  if (!data) {
    logger.warn(`[Validation] [${debugName}] data is missing`);
    return true;
  }
  const isEmpty = !schema._nodes.some(attr => {
    const value = data[attr];
    const isValueSet = value !== undefined && value !== null && value !== "";
    return isValueSet;
  });
  return isEmpty;
}

function getGlobalStatus(status) {
  const statusArray = Object.values(status);
  return statusArray.some(x => x === "invalid")
    ? "invalid"
    : statusArray.some(x => x === "empty")
    ? "empty"
    : "valid";
}

module.exports = {
  getValidationStatus,
  getGlobalStatus
};
