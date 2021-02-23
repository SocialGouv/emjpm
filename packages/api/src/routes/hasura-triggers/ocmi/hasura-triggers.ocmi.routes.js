const express = require("express");
const Seven = require("node-7z");
const { promises: fs } = require("fs");
const path = require("path");
const os = require("os");
const config = require("~/config");
const { OcmiMandataire, ProcessusStates } = require("~/models");

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

  if (await processIsRunning()) {
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
  await processusStateStartImport();
  importFromLocal();
  return {
    state: "start",
  };
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
  const {
    name,
    properties: { contentLength, createdOn, lastModified, contentType },
  } = blob;

  if (await hasBeenProcessed(blob)) {
    logger.info(`[OCMI] ${name} has been already processed`);
    return {
      state: "has_been_already_processed",
    };
  }

  await processusStateStartImport();
  importFromAzure(container, blob);

  return {
    contentLength,
    contentType,
    createdOn,
    lastModified,
    name,
    state: "start",
  };
}

async function importFromAzure(container, blob) {
  const tempDir = os.tmpdir();
  const zipFilePath = await azureBlobToFile(tempDir, container, blob);
  const unzippedFile = await unzipFile(tempDir, zipFilePath);
  if (!unzippedFile) {
    return;
  }
  await importJSON(unzippedFile);
}

async function importFromLocal() {
  const zipFilePath = path.join(
    ocmiSyncFileLocalDirPath,
    "ocmi-emjpmenq.json.zip"
  );
  const unzippedFile = await unzipFile(ocmiSyncFileLocalDirPath, zipFilePath);
  if (!unzippedFile) {
    return;
  }
  await importJSON(unzippedFile);
}

async function azureBlobToFile(
  tempDir,
  container,
  { name, properties: { contentLength } }
) {
  const zipFilePath = path.join(tempDir, name);

  logger.info(`[OCMI] loading file from azure ${name}`);
  const buffer = await readBlob(container, name, contentLength);

  await fs.writeFile(zipFilePath, buffer);
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

async function importJSON(file) {
  const fileContent = await fs.readFile(file, "utf8");
  const mesures = JSON.parse(fileContent);
  const ocmiMandataires = getOcmiMandataires(mesures);
  const keys = Object.keys(ocmiMandataires);
  const size = keys.length;
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const ocmiMandataire = ocmiMandataires[key];
    logger.info(`[OCMI] processed ocmi mandataire ${index} / ${size}`);
    await createOrUpdateOcmiMandataire(ocmiMandataire);
  }
  logger.info(`[OCMI] sync file finished`);
  await completeImport();
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

function getOcmiMandataires(mesures) {
  const mandataireMap = {};
  for (const mesure of mesures) {
    const { mandataire } = mesure;
    const { siret } = mandataire;

    const value = mandataireMap[siret];
    if (value) {
      value.mesures.push(mesure);
    } else {
      delete mesure["mandataire"];
      mandataire.mesures = [mesure];
      mandataireMap[siret] = mandataire;
    }
  }
  return mandataireMap;
}

async function processIsRunning() {
  const processusState = await ProcessusStates.query().findById(
    "ocmi_sync_file"
  );
  if (!processusState) {
    return false;
  }
  return !processusState.end_date;
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

async function completeImport() {
  await ProcessusStates.query().where({ id: "ocmi_sync_file" }).update({
    end_date: new Date(),
  });
}

async function processusStateStartImport() {
  let processusState = await ProcessusStates.query().findById("ocmi_sync_file");
  if (!processusState) {
    processusState = await ProcessusStates.query().insertAndFetch({
      id: "ocmi_sync_file",
    });
  }
  await ProcessusStates.query().where({ id: "ocmi_sync_file" }).update({
    end_date: null,
    start_date: new Date(),
  });
}
