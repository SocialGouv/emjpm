const logger = require("~/utils/logger");

async function getValidationStatus(
  data,
  { schema, debugName, logDataWithErrors, logDataIfEmpty, logData }
) {
  if (logData) {
    logger.info(
      `[Validation] [${debugName}] DATA: ${JSON.stringify(
        data,
        undefined,
        2
      )} ${JSON.stringify(schema._nodes)}`
    );
  }
  if (isEmptyData(data, schema, debugName)) {
    if (logDataIfEmpty) {
      logger.info(
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
    await logValidationErrors(data, { debugName, logDataWithErrors, schema });
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
      err.errors.forEach((msg) => {
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
  const isEmpty = !schema._nodes.some((attr) => {
    const value = data[attr];
    const isValueSet = value !== undefined && value !== null && value !== "";
    return isValueSet;
  });
  return isEmpty;
}

function getGlobalStatus(status) {
  const statusArray = Object.values(status);
  if (statusArray.some((x) => x === "invalid")) {
    return "invalid";
  }
  if (statusArray.some((x) => x === "empty-half")) {
    return "empty-half";
  }
  if (statusArray.some((x) => x === "empty")) {
    if (statusArray.some((x) => x === "valid")) {
      return "empty-half";
    }
    return "empty";
  }
  return "valid";
}

function getTopLevelGlobalStatus(status) {
  return getGlobalStatus(
    Object.keys(status).reduce((acc, key) => {
      acc[key] = status[key].global;
      return acc;
    }, {})
  );
}

module.exports = {
  getGlobalStatus,
  getTopLevelGlobalStatus,
  getValidationStatus,
};
