const express = require("express");
const { format } = require("date-fns");
const Client = require("ssh2").Client;
const JSONStream = require("JSONStream");

const logger = require("~/utils/logger");
const queries = require("./queries");
const { RoutineLog } = require("~/models");

const router = express.Router();

const private_value =
  process.env?.P5_SFTP_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";

const SftpOptions = {
  host: process.env.P5_SFTP_HOST,
  port: process.env.P5_SFTP_PORT,
  privateKey: Buffer.from(private_value),
  username: process.env.P5_SFTP_USERNAME,
};

const P5_FOLDER_ENV = process.env.P5_FOLDER_ENV || "dev";
const withSecond = () => format(new Date(), "yyyyMMddHHmmss");
const currentDate = () => format(new Date(), "yyyyMMdd");

async function sftpUpload(sftp, table, sql) {
  return new Promise((resolve, reject) => {
    const writeStream = sftp.createWriteStream(
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${table}_${currentDate()}.json`
    );

    writeStream.on("finish", function () {
      logger.info(`[p5-export] ${table} uploaded successfully`);
      resolve();
    });

    writeStream.on("error", function (err) {
      console.log("[p5-export] error while uploading", err);
      reject(err);
    });

    logger.info(`[p5-export] uploading ${table} `);
    const kstream = sql.stream();
    kstream.on("error", function (args) {
      console.log("error", args);
    });
    kstream.on("data", function () {
      // console.log("data", args);
    });

    kstream.on("finish", function () {
      console.log("end");
    });
    kstream.pipe(JSONStream.stringify()).pipe(writeStream);
  });
}

router.post("/execute", async (req, res) => {
  const dateOfExecution = new Date();

  logger.info(`[p5-export] export init`);
  res.json({
    state: "start",
  });

  const conn = new Client();
  conn
    .on("ready", function () {
      conn.sftp(function (err, sftp) {
        if (err) throw err;

        logger.info("[p5-export] connected to sftp server");

        async function execute() {
          try {
            for (const [key, val] of Object.entries(queries)) {
              await sftpUpload(sftp, key, val).catch((e) => {
                throw new Error(e);
              });
            }
            logger.info("[p5-export] p5-export done");
            await RoutineLog.query().insert({
              end_date: new Date(),
              result: "success",
              start_date: dateOfExecution,
              type: "p5_export",
            });
          } catch (error) {
            console.log(`[p5-export] export error`, error);
            await RoutineLog.query().insert({
              end_date: new Date(),
              result: "error",
              start_date: dateOfExecution,
              type: "p5_export",
            });
          } finally {
            console.log("end");
            conn.end();
          }
        }

        execute();
      });
    })
    .connect(SftpOptions);
});

module.exports = router;
