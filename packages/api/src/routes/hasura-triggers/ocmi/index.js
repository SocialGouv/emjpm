const express = require("express");
const Seven = require("node-7z");
const fs = require("fs");
const path = require("path");
const os = require("os");

const StreamArray = require("stream-json/streamers/StreamArray");
const lineReader = require("line-reader");

const config = require("~/config");
const { OcmiMandataire, RoutineLog, Mandataire } = require("~/models");

const { acquireLock, releaseLock } = require("~/utils/pg-mutex-lock");

const updateMandataireMesuresFromOCMI = require("~/services/updateMandataireMesuresFromOCMI");

const router = express.Router();

const {
  readBlob,
  getBlobContainer,
  listBlobsOrderByLastModifiedDesc,
} = require("~/utils/azure");

const logger = require("~/utils/logger");

const {
  ocmiSyncFileEnabled,
  ocmiSyncFileLocal,
  ocmiSyncFileLocalDirPath,
  azureAccountName,
  azureAccountKey,
} = config;

const lockKey = "ocmi_sync_file";

router.post("/sync-file", async (req, res) => {
  if (!ocmiSyncFileEnabled) {
    logger.info(`[OCMI] ocmi sync file is not enabled`);
    return res.json({
      state: "OCMI sync file not enabled",
    });
  }

  const lockAcquired = await acquireLock(lockKey, {
    timeout: 3600,
  });

  if (!lockAcquired) {
    logger.info(`[OCMI] sync file is already running.`);
    return res.json({
      state: "is_already_running",
    });
  }

  let err;
  try {
    if (ocmiSyncFileLocal) {
      await startImportFromLocal();
    } else {
      await startImportFromAzure();
    }
  } catch (e) {
    err = e;
  }

  await releaseLock(lockKey);

  if (err) {
    return res.json({ error: err });
  }
  return res.json({
    state: "start",
  });
});

module.exports = router;

async function startImportFromLocal() {
  const logId = await processusStateStartImport();
  importFromLocal(logId);
}

async function startImportFromAzure() {
  if (!azureAccountName || !azureAccountKey) {
    logger.error(`[OCMI] AZURE_ACCOUNT_NAME or AZURE_ACCOUNT_KEY not defined`);
    return {
      state: "AZURE_ACCOUNT_NAME or AZURE_ACCOUNT_KEY not defined",
    };
  }

  const container = getBlobContainer("emjpm-echange");
  const [blob] = await listBlobsOrderByLastModifiedDesc(container);

  const result = { state: "start" };
  if (blob) {
    const { name, properties } = blob;
    const { contentLength, createdOn, lastModified, contentType } = properties;
    if (await hasBeenProcessed(blob)) {
      logger.info(`[OCMI] ${name} has been already processed`);
      const now = new Date();
      await RoutineLog.query().insert({
        end_date: now,
        result: "unchanged",
        start_date: now,
        type: "ocmi_sync_file",
      });
      return {
        state: "has_been_already_processed",
      };
    }
    result.contentLength = contentLength;
    result.contentType = contentType;
    result.createdOn = createdOn;
    result.lastModified = lastModified;
    result.name = name;
  }

  const logId = await processusStateStartImport();
  importFromAzure(logId, container, blob);

  return result;
}

async function importFromAzure(logId, container, blob) {
  const tempDir = os.tmpdir();
  const zipFilePath = await azureBlobToFile(tempDir, container, blob);
  const unzippedFile = await unzipFile(tempDir, zipFilePath);
  if (!unzippedFile) {
    return;
  }
  await runImportJSON(logId, unzippedFile);
}

async function importFromLocal(logId) {
  const zipFilePath = path.join(
    ocmiSyncFileLocalDirPath,
    "ocmi-emjpmenq.json.zip"
  );
  const unzippedFile = await unzipFile(ocmiSyncFileLocalDirPath, zipFilePath);
  if (!unzippedFile) {
    return;
  }
  await runImportJSON(logId, unzippedFile);
}

async function azureBlobToFile(
  tempDir,
  container,
  { name, properties: { contentLength } }
) {
  const zipFilePath = path.join(tempDir, name);

  logger.info(`[OCMI] loading file from azure ${name}`);
  const buffer = await readBlob(container, name, contentLength);

  await fs.promises.writeFile(zipFilePath, buffer);
  return zipFilePath;
}

async function unzipFile(tempDir, zipFilePath) {
  logger.info(`[OCMI] unzipping file ${zipFilePath}`);
  const stream = Seven.extract(zipFilePath, tempDir, {
    password: config.ocmiFilePassword,
    recursive: true,
  });
  const unzipped = new Promise((resolve, reject) => {
    stream.on("data", async function ({ file }) {
      const unzippedFile = path.join(tempDir, file);
      resolve(unzippedFile);
    });
    stream.on("error", function (err) {
      reject(err);
    });
  });

  let err;
  let unzippedFile;
  try {
    unzippedFile = await unzipped;
  } catch (e) {
    err = e;
  }
  if (err) {
    logger.error(err);
    return false;
  }
  logger.info(`[OCMI] file unzipped  ${unzippedFile}`);
  return unzippedFile;
}

async function runImportJSON(logId, file) {
  let success;
  try {
    await importJSON(file);
    success = true;
    logger.info(`[OCMI] sync file finished`);
  } catch (e) {
    success = false;
    logger.error(e);
  }

  await RoutineLog.query()
    .findById(logId)
    .update({
      end_date: new Date(),
      result: success ? "success" : "error",
    });
}
async function importJSON(file) {
  const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "ocmi-"));

  let index = 0;
  const jsonStream = StreamArray.withParser();
  fs.createReadStream(file).pipe(jsonStream.input);

  const mandataireSIRETList = new Set();
  jsonStream.on("data", async ({ value: mesure }) => {
    const { mandataire } = mesure;
    const { siret } = mandataire;
    mandataireSIRETList.add(siret);
    const jsonlFile = path.join(tempDir, "mandataire-" + siret + ".json");
    index++;
    await fs.promises.appendFile(jsonlFile, JSON.stringify(mesure) + "\n");
  });
  await new Promise((resolve, reject) => {
    jsonStream.on("end", () => resolve()).on("error", () => reject());
  });

  index = 0;
  const size = mandataireSIRETList.size;
  for (const [siret] of mandataireSIRETList.entries()) {
    const jsonlFile = path.join(tempDir, "mandataire-" + siret + ".json");
    const mesures = [];
    let mandataire;
    await new Promise((resolve, reject) => {
      lineReader.eachLine(
        jsonlFile,
        function (line) {
          if (!line) return;
          const mesure = JSON.parse(line);
          if (!mandataire) {
            mandataire = mesure["mandataire"];
          }
          delete mesure["mandataire"];
          mesures.push(mesure);
        },
        function (err) {
          if (err) reject(err);
          resolve();
        }
      );
    });
    const ocmiMandataire = { ...mandataire, mesures, siret };
    await createOrUpdateOcmiMandataire(ocmiMandataire);
    await updateOcmiMandataireMesures(siret);
    index++;
    logger.info(`[OCMI] processed ocmi mandataire ${index} / ${size}`);
  }
}

async function createOrUpdateOcmiMandataire(ocmiMandataire) {
  const { siret, mesures } = ocmiMandataire;
  const entity = await OcmiMandataire.query()
    .findOne({ siret })
    .select("siret");
  ocmiMandataire.mesures = JSON.stringify(mesures);
  if (!entity) {
    await OcmiMandataire.query().insert(ocmiMandataire);
  } else {
    await OcmiMandataire.query().update(ocmiMandataire).where({ siret });
  }
}

async function updateOcmiMandataireMesures(siret) {
  const mandataire = await Mandataire.query().findOne({ siret });
  if (mandataire) {
    const { user_id: userId } = mandataire;
    try {
      await updateMandataireMesuresFromOCMI({ userId });
    } catch (error) {
      console.error(error);
    }
  }
}

async function hasBeenProcessed({ properties: { createdOn, lastModified } }) {
  const log = await RoutineLog.query()
    .findOne({
      result: "success",
      type: "ocmi_sync_file",
    })
    .orderBy("end_date", "desc");
  if (!log) {
    return false;
  }
  const processedTime = log.start_date.getTime();
  return (
    processedTime > createdOn.getTime() &&
    processedTime > lastModified.getTime()
  );
}

async function processusStateStartImport() {
  const { id: logId } = await RoutineLog.query()
    .insert({
      start_date: new Date(),
      type: "ocmi_sync_file",
    })
    .returning("id");
  return logId;
}
