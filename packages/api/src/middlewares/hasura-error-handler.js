const sentry = require("../utils/sentry");
const logger = require("../utils/logger");
const HttpError = require("../utils/error/HttpError");

// https://hasura.io/docs/1.0/graphql/manual/actions/action-handlers.html#returning-an-error-response
const hasuraActionErrorHandler = (message) => (err, req, res, next) => {
  if (err) {
    logger.error("[hasuraActionErrorHandler]", err);
    if (err instanceof HttpError) {
      logger.warn(err.message);
      // response format: {message!, code}
      return res.status(err.code).json({
        message: err.message,
      });
    } else {
      if (!message) {
        message = "Une erreur est survenue, veuillez réessayer plus tard";
      }
      logger.error(err);
      // response format: {message!, code}
      res.status(400).json({
        message,
      });
      sentry.captureException(err);
    }
  } else {
    return next();
  }
};

module.exports = hasuraActionErrorHandler;
