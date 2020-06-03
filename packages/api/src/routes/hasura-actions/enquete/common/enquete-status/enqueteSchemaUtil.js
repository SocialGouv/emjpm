async function getValidationStatus(data, validationSchema, debugName) {
  if (!data) {
    return "empty";
  }
  const isEmpty = !validationSchema._nodes.some(attr => {
    const value = data[attr];
    const isValueSet = value !== undefined && value !== null;
    if (isValueSet) {
      if (debugName) {
        console.log(`xxx [${debugName}] isValueSet:`, attr, value);
      }
    }
    return isValueSet;
  });
  if (debugName) {
    console.log(`xxx [${debugName}] data:`, data);
  }
  if (debugName) {
    console.log(
      `xxx [${debugName}] validationSchema._nodes:`,
      validationSchema._nodes
    );
  }
  if (debugName) {
    console.log(`xxx [${debugName}] IS EMPTY:`, isEmpty);
  }
  if (isEmpty) {
    return "empty";
  }
  const isValid = await validationSchema.isValid(data);

  if (isValid) {
    return "valid";
  }
  if (debugName) {
    console.log(`xxx [${debugName}] INVALID:`);
  }
  return "invalid";
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
