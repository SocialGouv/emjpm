const express = require("express");
const { format } = require("date-fns");
const { Readable } = require("stream");
const Client = require("~/utils/sftp");
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

const router = express.Router();
const logger = require("~/utils/logger");

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

const sftp = new Client();

const buildReadableStream = () => {
  return new Readable({
    objectMode: true,
    read() {},
  });
};

router.post("/execute", async (req, res) => {
  const dateOfExecution = new Date();

  logger.info(`[p5-export] export init`);
  res.json({
    state: "start",
  });
  function createStream(table) {
    const stream = buildReadableStream();
    stream.push("[");
    table.forEach((row, index) => {
      stream.push(JSON.stringify(row));
      if (index < table.length - 1) {
        stream.push(",");
      }
    });
    stream.push("]");
    stream.push(null);
    return stream;
  }

  try {
    await sftp.connect(SftpOptions);

    const mandataires = await Mandataire.query();
    const mandatairesStream = await createStream(mandataires);

    await sftp.uploadFile(
      mandatairesStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"mandataires"}_${currentDate()}.json`
    );
    logger.info("[p5-export] export - mandataires uploaded");

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
    const userStreamStream = createStream(users);

    await sftp.uploadFile(
      userStreamStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"users"}_${currentDate()}.json`
    );
    logger.info("[p5-export] export - users uploaded");

    const regions = await Region.query();
    const regionsStream = createStream(regions);

    await sftp.uploadFile(
      regionsStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"regions"}_${currentDate()}.json`
    );
    logger.info("[p5-export] export - regions uploaded");

    const services = await Service.query().leftJoin(
      "service_departements",
      "services.id",
      "=",
      "service_departements.service_id"
    );
    const ServicesStream = createStream(services);

    await sftp.uploadFile(
      ServicesStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"services"}_${currentDate()}.json`
    );
    logger.info("[p5-export] export - services uploaded");

    const departements = await Departement.query();
    const departementsStream = createStream(departements);
    await sftp.uploadFile(
      departementsStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"departements"}_${currentDate()}.json`
    );
    logger.info("[p5-export] export - departements uploaded");

    const mandataire_individuel_departements =
      await MandatairesIndividuelDepartement.query();
    const mid = createStream(mandataire_individuel_departements);
    await sftp.uploadFile(
      mid,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"mandataire_individuel_departements"}_${currentDate()}.json`
    );
    logger.info(
      "[p5-export] export - mandataire_individuel_departements uploaded"
    );

    const mesures = await Mesure.query();
    const mesuresStream = createStream(mesures);
    await sftp.uploadFile(
      mesuresStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"mesures"}_${currentDate()}.json`
    );
    logger.info("[p5-export] export - mesures uploaded");

    const mesuresEtat = await MesureEtat.query();
    const mesuresEtatStream = createStream(mesuresEtat);
    await sftp.uploadFile(
      mesuresEtatStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"mesure_etat"}_${currentDate()}.json`
    );
    logger.info("[p5-export] export - mesure_etat uploaded");

    const mesuresResources = await MesureRessources.query();
    const mesuresResourcesStream = createStream(mesuresResources);
    await sftp.uploadFile(
      mesuresResourcesStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"mesure_ressources"}_${currentDate()}.json`
    );
    logger.info("[p5-export] export - mesure_ressources uploaded");
    const mesuresResourcesPrestations =
      await MesureRessourcesPrestationsSociales.query();
    const mesuresResourcesPrestationsStream = createStream(
      mesuresResourcesPrestations
    );
    await sftp.uploadFile(
      mesuresResourcesPrestationsStream,
      `./${P5_FOLDER_ENV}/files_emjpm/P1_${withSecond()}_eMJPM_${"mesure_ressources_prestations_sociales"}_${currentDate()}.json`
    );
    logger.info(
      "[p5-export] export - mesure_ressources_prestations_sociales uploaded"
    );

    await RoutineLog.query().insert({
      end_date: new Date(),
      result: "success",
      start_date: dateOfExecution,
      type: "p5_export",
    });

    sftp.disconnect();
  } catch (error) {
    sftp.disconnect();
    RoutineLog.query().insert({
      end_date: new Date(),
      result: "error",
      start_date: dateOfExecution,
      type: "p5_export",
    });
    console.log(`[p5-export] export error`, error);
  }
});

module.exports = router;
