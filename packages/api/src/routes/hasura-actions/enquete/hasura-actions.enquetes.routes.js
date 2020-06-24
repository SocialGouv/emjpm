const express = require("express");
const HttpError = require("../../../utils/error/HttpError");

const logger = require("../../../utils/logger");
const mandataireIndividuelEnqueteImporter = require("./mandataire-individuel-import/mandataireIndividuelEnqueteImporter");
const preposeEnqueteImporter = require("./mandataire-prepose-import/preposeEnqueteImporter");
const checkEnqueteContext = require("./hasura-actions.enquetes.checker");
const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");
const {
  initEnqueteMandataireIndividuel,
  submitEnqueteMandataireIndividuel,
} = require("./mandataire-individuel/enqueteMandataireIndividuel");
const {
  initEnqueteMandatairePrepose,
  submitEnqueteMandatairePrepose,
} = require("./mandataire-prepose/enqueteMandatairePrepose");
const {
  initEnqueteService,
  // submitEnqueteService,
} = require("./service/enqueteService");
const router = express.Router();

router.post(
  "/submit",
  async (req, res, next) => {
    try {
      const enqueteContext = await checkEnqueteContext(req);

      let enqueteReponse;
      if (enqueteContext.role === "individuel") {
        enqueteReponse = await submitEnqueteMandataireIndividuel({
          enqueteContext,
        });
      } else if (enqueteContext.role === "prepose") {
        enqueteReponse = enqueteReponse = await submitEnqueteMandatairePrepose({
          enqueteContext,
        });
      } else {
        logger.error("Unexpected role", enqueteContext.role);
        return next(new HttpError(500, "Unexpected role"));
      }

      return res.json({
        enquete_id: enqueteReponse.enquete_id,
        enquete_reponses_id: enqueteReponse.id,
        submitted_at: enqueteReponse.submitted_at,
      });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error submitting enquete")
);

router.post(
  "/reponse-status",
  async (req, res, next) => {
    try {
      const enqueteContext = await checkEnqueteContext(req);

      let result;
      if (enqueteContext.role === "individuel") {
        result = await initEnqueteMandataireIndividuel({ enqueteContext });
      } else if (enqueteContext.role === "prepose") {
        result = await initEnqueteMandatairePrepose({ enqueteContext });
      } else if (enqueteContext.role === "service") {
        result = await initEnqueteService(enqueteContext);
      } else {
        logger.error("Unexpected role", enqueteContext.role);
        return next(new HttpError(500, "Unexpected role"));
      }

      return res.json(result);
    } catch (err) {
      logger.error(err, "error");
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processiong status")
);

// hasura action: `upload_enquete_file`
router.post(
  "/upload",
  async (req, res, next) => {
    try {
      const enqueteContext = await checkEnqueteContext(req);
      const file = { content: req.body.input.content };

      let result;
      if (enqueteContext.role === "individuel") {
        result = await mandataireIndividuelEnqueteImporter.importEnqueteFile({
          file,
          enqueteContext,
        });
      } else if (enqueteContext.role === "prepose") {
        result = await preposeEnqueteImporter.importEnqueteFile({
          file,
          enqueteContext,
        });
      } else {
        logger.error("Unexpected role", enqueteContext.role);
        return next(new HttpError(500, "Unexpected role"));
      }

      return res.status(201).json({
        data: JSON.stringify(result),
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
