const express = require("express");

const logger = require("../../utils/logger");
const actionsMesuresImporter = require("./mesures-import/actionsMesuresImporter");
const hasuraActionErrorHandler = require("../../middlewares/hasura-error-handler");
const HttpError = require("../../utils/error/HttpError");
const { Service } = require("../../models/Service");
const {
  initEnqueteMandataireIndividuel
} = require("./enquetes/enqueteMandataireIndividuel");

const router = express.Router();

async function checkEnqueteIndividuelParameters(req, res) {
  const { enqueteId, mandataireId } = req.body.input;
  if (!enqueteId || !mandataireId) {
    res.status(422).json({
      message: "Invalid parameters: enqueteId or mandataireId is required"
    });
  }
}

router.post("/enquetes/individuel", async (req, res, next) => {
  await checkEnqueteIndividuelParameters(req, res);
  try {
    const { enqueteId, mandataireId } = req.body.input;
    const result = await initEnqueteMandataireIndividuel({
      enqueteId,
      mandataireId
    });
    return res.json(result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

// Hasura handler associated to `upload_mesures_file` hasura action
router.post(
  "/mesures/upload",
  async (req, res, next) => {
    try {
      const importMesuresParameters = await checkImportMesuresParameters(req);

      const importSummary = await actionsMesuresImporter.importMesuresFile(
        importMesuresParameters
      );

      return res.status(201).json({
        data: JSON.stringify(importSummary)
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

async function checkImportMesuresParameters(req) {
  const { role, userId } = req.user;

  const inputParameters = req.body.input;

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
    const service = await Service.query().findById(serviceId);
    if (!service || service.id !== serviceId) {
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
    if (userId !== mandataireUserId) {
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

module.exports = router;
