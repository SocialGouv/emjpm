const express = require("express");
const HttpError = require("~/utils/error/HttpError");

const logger = require("~/utils/logger");
const mandataireIndividuelEnqueteImporter = require("./mandataire-individuel-import/mandataireIndividuelEnqueteImporter");
const preposeEnqueteImporter = require("./mandataire-prepose-import/preposeEnqueteImporter");
const serviceEnqueteImporter = require("./service-import/serviceEnqueteImporter");
const checkEnqueteContext = require("./hasura-actions.enquetes.checker");
const hasuraActionErrorHandler = require("~/middlewares/hasura-error-handler");
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
  submitEnqueteService,
} = require("./service/enqueteService");

const router = express.Router();

router.post(
  "/submit",
  async (req, res, next) => {
    try {
      const enqueteContext = await checkEnqueteContext(req);
      let enqueteReponse;
      if (enqueteContext.user_type === "individuel") {
        enqueteReponse = await submitEnqueteMandataireIndividuel({
          enqueteContext,
        });
      } else if (enqueteContext.user_type === "prepose") {
        enqueteReponse = enqueteReponse = await submitEnqueteMandatairePrepose({
          enqueteContext,
        });
      } else if (enqueteContext.user_type === "service") {
        enqueteReponse = enqueteReponse = await submitEnqueteService({
          enqueteContext,
        });
      } else {
        logger.error("Unexpected user_type", enqueteContext.user_type);
        return next(new HttpError(500, "Unexpected user_type"));
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
      if (enqueteContext.user_type === "individuel") {
        result = await initEnqueteMandataireIndividuel({ enqueteContext });
      } else if (enqueteContext.user_type === "prepose") {
        result = await initEnqueteMandatairePrepose({ enqueteContext });
      } else if (enqueteContext.user_type === "service") {
        result = await initEnqueteService(enqueteContext);
      } else {
        logger.error("Unexpected user_type", enqueteContext.user_type);
        return next(new HttpError(500, "Unexpected user_type"));
      }

      return res.json(result);
    } catch (err) {
      logger.error(err, "error");
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing status")
);

// hasura action: `upload_enquete_file`
router.post(
  "/upload",
  async (req, res, next) => {
    try {
      const enqueteContext = await checkEnqueteContext(req);
      const file = { content: req.body.input.content };

      let result;
      if (enqueteContext.user_type === "individuel") {
        result = await mandataireIndividuelEnqueteImporter.importEnqueteFile({
          enqueteContext,
          file,
        });
      } else if (enqueteContext.user_type === "prepose") {
        result = await preposeEnqueteImporter.importEnqueteFile({
          enqueteContext,
          file,
        });
      } else if (enqueteContext.user_type === "service") {
        result = await serviceEnqueteImporter.importEnqueteFile({
          enqueteContext,
          file,
        });
      } else {
        logger.error("Unexpected user_type", enqueteContext.user_type);
        return next(new HttpError(500, "Unexpected user_type"));
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
