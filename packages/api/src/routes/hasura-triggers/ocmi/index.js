const express = require("express");
const Seven = require("node-7z");
const fs = require("fs");
const path = require("path");
const os = require("os");

const StreamArray = require("stream-json/streamers/StreamArray");
const lineReader = require("line-reader");

const config = require("~/config");
const { OcmiMandataire, ProcessusStates } = require("~/models");
const {
  processusIsRunning,
  startProcessus,
  endProcessus,
} = require("~/processus");

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

router.post("/sync-file", async (req, res) => {
  if (!ocmiSyncFileEnabled) {
    logger.info(`[OCMI] ocmi sync file is not enabled`);
    return res.json({
      state: "OCMI sync file not enabled",
    });
  }

  if (await processusIsRunning("ocmi_sync_file")) {
    logger.info(`[OCMI] sync file is already running.`);
    return res.json({
      state: "is_already_running",
    });
  }

  let err;
  let result;
  try {
    if (ocmiSyncFileLocal) {
      result = await startImportFromLocal();
    } else {
      console.log("A");
      result = await startImportFromAzure();
    }
  } catch (e) {
    err = e;
  }
  if (err) {
    return res.json({ error: err });
  }
  return res.json(result);
});

module.exports = router;

async function startImportFromLocal() {
  const { processusId } = await processusStateStartImport();
  importFromLocal(processusId);
  return {
    state: "start",
  };
}

async function startImportFromAzure() {
  console.log("B");
  if (!azureAccountName || !azureAccountKey) {
    console.log("C");
    logger.error(`[OCMI] AZURE_ACCOUNT_NAME or AZURE_ACCOUNT_KEY not defined`);
    return {
      state: "AZURE_ACCOUNT_NAME or AZURE_ACCOUNT_KEY not defined",
    };
  }

  console.log("D");
  const container = getBlobContainer("emjpm-echange");
  console.log("E");
  const [blob] = await listBlobsOrderByLastModifiedDesc(container);
  console.log("F");
  const {
    name,
    properties: { contentLength, createdOn, lastModified, contentType },
  } = blob;

  console.log("G");
  if (await hasBeenProcessed(blob)) {
    logger.info(`[OCMI] ${name} has been already processed`);
    console.log("H");
    return {
      state: "has_been_already_processed",
    };
  }
  console.log("I");

  const { processusId } = await processusStateStartImport();
  console.log("K");
  importFromAzure(processusId, container, blob);
  console.log("Z");

  return {
    contentLength,
    contentType,
    createdOn,
    lastModified,
    name,
    state: "start",
  };
}

async function importFromAzure(processusId, container, blob) {
  console.log("L");
  const tempDir = os.tmpdir();
  const zipFilePath = await azureBlobToFile(tempDir, container, blob);
  console.log("M");
  const unzippedFile = await unzipFile(tempDir, zipFilePath);
  console.log("N");
  if (!unzippedFile) {
    console.log("O");
    return;
  }
  console.log("P");
  await runImportJSON(processusId, unzippedFile);
  console.log("Q");
}

async function importFromLocal(processusId) {
  const zipFilePath = path.join(
    ocmiSyncFileLocalDirPath,
    "ocmi-emjpmenq.json.zip"
  );
  const unzippedFile = await unzipFile(ocmiSyncFileLocalDirPath, zipFilePath);
  if (!unzippedFile) {
    return;
  }
  await runImportJSON(processusId, unzippedFile);
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

async function runImportJSON(processusId, file) {
  let success;
  try {
    await importJSON(file);
    success = true;
    logger.info(`[OCMI] sync file finished`);
  } catch (e) {
    success = false;
    logger.error(e);
  }
  await endProcessus({ id: processusId, success });
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

async function hasBeenProcessed({ properties: { createdOn } }) {
  const processusState = await ProcessusStates.query().findById(
    "ocmi_sync_file"
  );
  if (!processusState) {
    return false;
  }
  return processusState.start_date.getTime() > createdOn.getTime();
}

async function processusStateStartImport() {
  return startProcessus({
    checkIsRunning: false,
    expirationTimeInHour: 2,
    type: "ocmi_sync_file",
  });
}
