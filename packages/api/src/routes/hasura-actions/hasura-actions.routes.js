const express = require("express");

const router = express.Router();
const actionsMesuresImporter = require("./mesures-import/actionsMesuresImporter");
const hasuraActionErrorHandler = require("../../middlewares/hasura-error-handler");
const HttpError = require("../../utils/error/HttpError");
const { Service } = require("../../models/Service");
const enqueteIndividuelController = require("../../controllers/enquetes/mandataire-individuel");

router.post("/enquetes/individuel", enqueteIndividuelController);

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
