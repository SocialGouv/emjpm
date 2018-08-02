const fs = require("fs");
const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();

const router = express.Router();

// HACK : https://github.com/swagger-api/swagger-ui/issues/4624
const indexContent = fs
  .readFileSync(`${pathToSwaggerUi}/index.html`)
  .toString()
  .replace(
    /https:\/\/petstore\.swagger\.io\/v2\/swagger\.json/g,
    "/doc/api-docs.json"
  );

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eMJPM-api",
      version: "1.0.0",
      description: "Documentation de l'API e-MJPM",
      contact: "contact@emjpm.beta.gouv.fr"
    },
    host: "https://emjpm-api.num.social.gouv.fr",
    basePath: "/"
  },
  apis: ["./routes/*.js"] // Path to the API docs
};

router.get("/api-docs.json", function(req, res) {
  const swaggerSpec = swaggerJSDoc(options);
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.get("/", (req, res) => res.send(indexContent));
router.get("/index.html", (req, res) => res.send(indexContent));

router.use(express.static(pathToSwaggerUi));

module.exports = router;
