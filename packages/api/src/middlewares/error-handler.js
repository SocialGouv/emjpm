const sentry = require("~/utils/sentry");
const logger = require("~/utils/logger");

const errorHandler = (error, req, res, next) => {
  if (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue, veuillez réessayer plus tard" });
    sentry.captureException(error);
  } else {
    return next();
  }
};

module.exports = errorHandler;
