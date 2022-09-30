const express = require("express");
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
} = require("~/models");
const SftpClient = require("~/utils/sftp");

const sftp = new SftpClient();

// const env = process.env.NODE_ENV || "development";
const env = "development";
const isDev = env === "development";

function generateDate() {
  const d = new Date();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return [year, month, day, hours, minutes, seconds].join("");
}

const private_value =
  process.env?.P5_SFTP_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";

const SftpOptions = {
  host: process.env.P5_SFTP_HOST,
  port: process.env.P5_SFTP_PORT,
  privateKey: Buffer.from(private_value),
  username: process.env.P5_SFTP_USERNAME,
};

const timestamps = generateDate();

async function extractTables() {
  const mandataires = await Mandataire.query();
  const regions = await Region.query();
  const services = await Service.query();
  const users = await User.query().select(
    "id",
    "created_at",
    "type",
    "last_login",
    "active",
    "reset_password_expires",
    "nom",
    "prenom",
    "cabinet",
    "email",
    "genre"
  );
  const departements = await Departement.query();
  const mandataire_individuel_departements =
    await MandatairesIndividuelDepartement.query();

  return {
    departements,
    mandataire_individuel_departements,
    mandataires,
    regions,
    services,
    users,
  };
}

router.post("/execute", async (req, res) => {
  logger.info(`[p5-export] export init`);
  const dateOfExecution = new Date();

  const data = await extractTables();

  sftp
    .connect(SftpOptions)
    .then(() => {
      logger.info(`[p5-export] connected to  ${process.env.P5_SFTP_HOST}`);

      const promises = Object.keys(data).map(async (tableName) => {
        return sftp.uploadFile(
          JSON.stringify(data[tableName]),
          `/var/lib/mandoline/${
            isDev ? "dev" : "prod"
          }/files_emjpm/P1_${timestamps}_eMJPM_${tableName}_${timestamps.slice(
            0,
            8
          )}.json`
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
          return res.json({
            state: "done",
          });
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
          return res.json({
            error: e,
          });
        });
    })
    .finally(() => {
      sftp.disconnect();
      console.log("[p5-export] disconnected from server");
    });
});

module.exports = router;
