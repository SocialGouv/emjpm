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
  console.log(`[p5-export]  upload begin from ${table}`);
  return new Promise((resolve, reject) => {
    const writeStream = sftp.createWriteStream(
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${table}_${currentDate()}.json`
    );

    console.log(`[p5-export] writeStream ${JSON.stringify(writeStream)}`);

    writeStream.on("close", function () {
      logger.info(`[p5-export] ${table} uploaded successfully`);
      resolve(resolve);
    });

    writeStream.on("end", function () {
      logger.info(`[p5-export] ${table} writeStream end`);
    });

    writeStream.on("error", function () {
      logger.info(`[p5-export] error while uploading ${table} `);
      reject();
    });
    logger.info(`[p5-export] uploading ${table} `);
    sql.stream().pipe(JSONStream.stringify()).pipe(writeStream);
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
        console.log("[p5-export] connected to sftp");
        if (err) throw err;

        async function execute() {
          try {
            await sftpUpload(sftp, "mandataires", queries.mandataires).catch(
              () => {
                throw new Error();
              }
            );
            await sftpUpload(sftp, "users", queries.users).catch(() => {
              throw new Error();
            });

            await sftpUpload(sftp, "mesures", queries.mesures).catch(() => {
              throw new Error();
            });

            // await sftpUpload(sftp, "mandataires", queries.mandataires).catch(
            //   () => {
            //     throw new Error();
            //   }
            // );
            // await sftpUpload(sftp, "users", queries.users).catch(() => {
            //   throw new Error();
            // });

            // await sftpUpload(sftp, "regions", queries.regions).catch(() => {
            //   throw new Error();
            // });

            // await sftpUpload(sftp, "departements", queries.departements).catch(
            //   () => {
            //     throw new Error();
            //   }
            // );

            await RoutineLog.query().insert({
              end_date: new Date(),
              result: "success",
              start_date: dateOfExecution,
              type: "p5_export",
            });
          } catch (error) {
            console.log(`[p5-export] export error`, err);
            await RoutineLog.query().insert({
              end_date: new Date(),
              result: "error",
              start_date: dateOfExecution,
              type: "p5_export",
            });
          } finally {
            conn.end();
          }
        }

        execute();
      });
    })
    .connect(SftpOptions);
});

module.exports = router;
