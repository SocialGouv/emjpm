const express = require("express");

const mesuresExportController = require("../../controllers/mesures/export");

const router = express.Router();

router.get("/export", mesuresExportController);

module.exports = router;
