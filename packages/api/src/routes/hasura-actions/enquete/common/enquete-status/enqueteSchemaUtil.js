const logger = require("../../../../../utils/logger");

async function getValidationStatus(
  data,
  { schema, debugName, logDataWithErrors, logDataIfEmpty }
) {
  if (isEmptyData(data, schema, debugName)) {
    if (logDataIfEmpty) {
      logger.error(
        `[Validation] [${debugName}] EMPTY DATA ${JSON.stringify(
          data,
          undefined,
          2
        )}`
      );
    }
    return "empty";
  }
  const isValid = await schema.isValid(data);

  if (!isValid) {
    await logValidationErrors(data, { schema, debugName, logDataWithErrors });
  }

  return isValid ? "valid" : "invalid";
}

async function logValidationErrors(
  data,
  { schema, debugName, logDataWithErrors }
) {
  try {
    await schema.validate(data);
  } catch (err) {
    if (err.name === "ValidationError" && err.errors) {
      if (logDataWithErrors) {
        logger.warn(
          `[Validation] [${debugName}] ${
            err.errors.length
          } errors in : ${JSON.stringify(data, undefined, 2)}`
        );
      } else {
        logger.warn(`[Validation] [${debugName}] ${err.errors.length} errors`);
      }
      err.errors.forEach(msg => {
        logger.info(`[Validation] [${debugName}] ${msg}`);
      });
    } else {
      logger.error(
        `[Validation] [${debugName}] undexpected error during validation`,
        err
      );
    }
  }
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
