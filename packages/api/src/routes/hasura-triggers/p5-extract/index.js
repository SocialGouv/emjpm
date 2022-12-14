const express = require("express");
const { format } = require("date-fns");
const Client = require("ssh2").Client;
const pg = require("pg");
const JSONStream = require("JSONStream");
const QueryStream = require("pg-query-stream");

const logger = require("~/utils/logger");
const queries = require("./queries");
// const { RoutineLog } = require("~/models");

const environment = process.env.NODE_ENV || "development";
const config = require("../../../../knexfile.js")[environment];

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

const pool = new pg.Pool(config.connection);

async function sftpUpload(sftp, table, sql) {
  return new Promise((resolve, reject) => {
    const writeStream = sftp.createWriteStream(
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${table}_${currentDate()}.json`
    );

    writeStream.on("close", function () {
      logger.info(`[p5-export] ${table} writeStream closed`);
    });

    writeStream.on("end", function () {
      logger.info(`[p5-export] ${table} writeStream end`);
    });

    pool.connect((err, client, done) => {
      if (err) {
        reject(err);
      }
      const query = new QueryStream(sql);
      const stream = client.query(query);
      //release the client when the stream is finished
      stream.on("end", () => {
        logger.info(`[p5-export] ${table} uploaded successfully`);
        resolve();
        done();
      });
      stream.pipe(JSONStream.stringify()).pipe(writeStream);
    });
  });
}

router.post("/execute", async (req, res) => {
  // const dateOfExecution = new Date();

  logger.info(`[p5-export] export init`);
  res.json({
    state: "start",
  });

  const conn = new Client();
  conn
    .on("ready", function () {
      conn.sftp(function (err, sftp) {
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
            await sftpUpload(sftp, "regions", queries.regions).catch(() => {
              throw new Error();
            });
            await sftpUpload(sftp, "departements", queries.departements).catch(
              () => {
                throw new Error();
              }
            );
            await sftpUpload(sftp, "services", queries.services).catch(() => {
              throw new Error();
            });
            await sftpUpload(
              sftp,
              "mandataire_individuel_departements",
              queries.mid
            ).catch(() => {
              throw new Error();
            });
            await sftpUpload(sftp, "mesures", queries.mesures).catch(() => {
              throw new Error();
            });
            await sftpUpload(sftp, "mesure_etat", queries.mesure_etat).catch(
              () => {
                throw new Error();
              }
            );
            await sftpUpload(
              sftp,
              "mesure_ressources",
              queries.mesure_ressources
            ).catch(() => {
              throw new Error();
            });
            await sftpUpload(
              sftp,
              "mesure_ressources_prestations_sociales",
              queries.mrps
            ).catch(() => {
              throw new Error();
            });
            // await RoutineLog.query().insert({
            //   end_date: new Date(),
            //   result: "success",
            //   start_date: dateOfExecution,
            //   type: "p5_export",
            // });
          } catch (error) {
            console.log(`[p5-export] export error`, err);
            // await RoutineLog.query().insert({
            //   end_date: new Date(),
            //   result: "error",
            //   start_date: dateOfExecution,
            //   type: "p5_export",
            // });
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
