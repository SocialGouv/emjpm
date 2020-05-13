const express = require("express");
const router = express.Router();
const actionsMesuresImporter = require("./mesures/import/actionsMesuresImporter");
const logger = require("../../utils/logger");
const HttpError = require("../../utils/error/HttpError");
const {
  parseHasuraSessionVariables
} = require("./hasura-action-session-variable-parser");

// Hasura handler associated to `upload_mesures_file` hasura action
router.post("/mesures/upload", async (req, res) => {
  try {
    const importMesuresParameters = checkImportMesuresParameters(req);

    const importSummary = await actionsMesuresImporter.importMesuresFile(
      importMesuresParameters
    );

    return res.status(201).json({
      data: JSON.stringify(importSummary)
    });
  } catch (err) {
    return handleError(err, {
      res,
      message: "Unexpected error processing file"
    });
  }
});

function checkImportMesuresParameters(req) {
  const hasuraSessionVariables = parseHasuraSessionVariables(req);

  const inputParameters = req.body.input;

  const { user_id, service_id, role } = hasuraSessionVariables;

  const {
    name,
    base64str,
    serviceId,
    mandataireUserId,
    antennesMap
  } = inputParameters;

  if (!serviceId && !mandataireUserId) {
    throw new HttpError(
      422,
      "Invalid parameters: serviceId or mandataireUserId is required"
    );
  }

  let importContext;
  if (role === "admin") {
    // ADMIN
    importContext = serviceId ? { serviceId } : { mandataireUserId };
  } else if (role === "service") {
    // SERVICE
    if (!serviceId) {
      throw new HttpError(422, "Invalid parameters: serviceId is required");
    }
    if (service_id !== serviceId) {
      throw new HttpError(403, "Access denied: invalid serviceId");
    }
    importContext = { serviceId };
  } else if (role === "individuel") {
    // MANDATAIRE INDIVIDUEL
    if (!mandataireUserId) {
      throw new HttpError(
        422,
        "Invalid parameters: mandataireUserId is required"
      );
    }
    if (user_id !== mandataireUserId) {
      throw new HttpError(403, "Access denied: invalid mandataireUserId");
    }
    importContext = { mandataireUserId };
  } else {
    throw new HttpError(403, "Unexpected user");
  }

  const importMesuresParameters = {
    file: {
      base64str,
      type: name.endsWith(".xls") || name.endsWith(".xlsx") ? "xls" : "csv"
    },
    importContext,
    antennesMap: antennesMap ? JSON.parse(antennesMap) : undefined
  };
  return importMesuresParameters;
}

function handleError(err, { res, message }) {
  if (err instanceof HttpError) {
    logger.warn(err.message);
    return res.status(err.code).json({
      message: err.message,
      code: err.code
    });
  }
  logger.warn(message);
  logger.error(err);

  return res.status(400).json({
    message,
    code: 400
  });
}

module.exports = router;
