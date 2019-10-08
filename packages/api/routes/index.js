const express = require("express");
const router = express.Router();

router.use("/mandataires", require("./mandataires"));
router.use("/usersTi", require("./usersTi"));

router.use("/mesures", require("./mesures"));
router.use("/email", require("./email"));
router.use("/admin", require("./admin"));
router.use("/users", require("./users"));
router.use("/webhook", require("./webhook"));

module.exports = router;
