async function getValidationStatus(data, validationSchema) {
  if (isEmptyData(data, validationSchema)) {
    return "empty";
  }
  const isValid = await validationSchema.isValid(data);

  return isValid ? "valid" : "invalid";
}
function isEmptyData(data, validationSchema) {
  if (!data) {
    return true;
  }
  const isEmpty = !validationSchema._nodes.some(attr => {
    const value = data[attr];
    const isValueSet = value !== undefined && value !== null;
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
