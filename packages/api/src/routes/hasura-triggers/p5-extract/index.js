const express = require("express");
const { format } = require("date-fns");
const Buffer = require("buffer").Buffer;

const logger = require("~/utils/logger");

const router = express.Router();

const {
  MandatairesIndividuelDepartement,
  Mandataire,
  Region,
  Service,
  User,
  Departement,
  RoutineLog,
  Mesure,
  MesureEtat,
  MesureRessources,
  MesureRessourcesPrestationsSociales,
} = require("~/models");
const SftpClient = require("~/utils/sftp");

const sftp = new SftpClient();

const P5_FOLDER_ENV = process.env.P5_FOLDER_ENV || "dev";

const withSecond = () => format(new Date(), "yyyyMMddHHmmss");
const currentDate = () => format(new Date(), "yyyyMMdd");

const private_value =
  process.env?.P5_SFTP_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";

const SftpOptions = {
  host: process.env.P5_SFTP_HOST,
  port: process.env.P5_SFTP_PORT,
  privateKey: Buffer.from(private_value),
  username: process.env.P5_SFTP_USERNAME,
};

// const BASE_PATH = "/var/lib/mandoline";

async function extractTables() {
  const mandataires = await Mandataire.query();
  const regions = await Region.query();
  // const services = await Service.query().withGraphFetched("[departments]");
  const services = await Service.query()
    .leftJoin(
      "service_departements",
      "services.id",
      "=",
      "service_departements.service_id"
    )
    .select("services.*", "service_departements.departement_code")
    .orderByRaw("services.id");

  const users = await User.query().select(
    "id",
    "created_at",
    "type",
    "active",
    "nom",
    "prenom",
    "cabinet",
    "email",
    "genre"
  );
  const departements = await Departement.query();
  const mandataire_individuel_departements =
    await MandatairesIndividuelDepartement.query();
  const mesures = await Mesure.query();
  const mesuresEtat = await MesureEtat.query();
  const mesuresResources = await MesureRessources.query();
  const mesuresResourcesPrestations =
    await MesureRessourcesPrestationsSociales.query();

  return {
    departements,
    mandataire_individuel_departements,
    mandataires,
    mesures,
    mesuresEtat,
    mesuresResources,
    mesuresResourcesPrestations,
    regions,
    services,
    users,
  };
}

router.post("/execute", async (req, res) => {
  logger.info(`[p5-export] export init`);
  const dateOfExecution = new Date();
  res.json({
    state: "start",
  });
  const data = await extractTables();

  sftp
    .connect(SftpOptions)
    .then(() => {
      logger.info(`[p5-export] connected to  ${process.env.P5_SFTP_HOST}`);

      const promises = Object.keys(data).map(async (tableName) => {
        return sftp.uploadFile(
          JSON.stringify(data[tableName]),
          `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${tableName}_${currentDate()}.json`
        );
      });
      return Promise.all(promises);
    })
    .then((resp) => {
      resp.forEach((el) => {
        logger.info(`[p5-export] ${el}`);
      });

      logger.info(`[p5-export] uploading finished`);
      RoutineLog.query()
        .insert({
          end_date: new Date(),
          result: "success",
          start_date: dateOfExecution,
          type: "p5_export",
        })
        .then(() => {
          logger.info(`[p5-export] p5_export finished successfully`);
        });
    })
    .catch((e) => {
      console.log("[p5-export] Eror occured  while uploading file", e.message);
      RoutineLog.query()
        .insert({
          end_date: new Date(),
          result: "error",
          start_date: dateOfExecution,
          type: "p5_export",
        })
        .then(() => {
          logger.info(`[p5-export] p5_export finished with error`);
          // return res.json({
          //   error: e,
          // });
        });
    })
    .finally(() => {
      sftp.disconnect();
      console.log("[p5-export] disconnected from server");
    });
});

module.exports = router;
