const express = require("express");
const {
  resolvers: {
    default: {
      Mutation: {
        recalculateServiceMesuresCount,
        recalculateMandataireMesuresCount,
      },
    },
  },
} = require("@emjpm/graphql");

const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");

const router = express.Router();

router.post(
  "/calculate-mesures",
  async (req, res, next) => {
    const { serviceId, mandataireId } = req.body.input;
    let result;
    if (serviceId) {
      result = await recalculateServiceMesuresCount({ serviceId });
    }
    if (mandataireId) {
      result = await recalculateMandataireMesuresCount({
        mandataireId,
      });
    }
    try {
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
