const express = require("express");
const pkg = require("../package.json");
const router = express.Router();

router.use("/mandataires", require("./mandataires"));
router.use("/usersTi", require("./usersTi"));
router.use("/auth", require("./auth"));
router.use("/mesures", require("./mesures"));
router.use("/email", require("./email").router);
router.use("/admin", require("./admin"));

router.get("/ping", function(req, res, next) {
  if (!req.user) {
    res.status(401).json({ success: false });
  } else {
    res.json({ success: true });
  }
});

router.get("/", function(req, res, next) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: process.env.NODE_ENV || "development"
  });
});

module.exports = router;
