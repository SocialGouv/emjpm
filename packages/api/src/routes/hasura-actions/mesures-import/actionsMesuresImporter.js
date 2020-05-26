const excelParser = require("../../../utils/file/excelParser");
const logger = require("../../../utils/logger");

const { Service } = require("../../../models/Service");
const actionsMesuresImporterGeoRepository = require("./repository/actionsMesuresImporterGeoRepository");
const actionsMesuresImporterMesureRepository = require("./repository/actionsMesuresImporterMesureRepository");
const { Mandataire } = require("../../../models/Mandataire");
const actionsMesuresImporterSchemaValidator = require("./schema/actionsMesuresImporterSchemaValidator");
const { Tis } = require("../../../models/Tis");
const { Mesure } = require("../../../models/Mesure");

const configuration = require("../../../env");
const inseeAPI = require("../../../utils/insee-api");

const actionsMesuresImporter = {
  importMesuresFile
};

async function importMesuresFile({
  file: { content, type },
  importContext: {
    // mandataireUserId & serviceId are mutually exclusive
    mandataireUserId,
    serviceId
  },
  antennesMap
}) {
  const start = Date.now();
  logger.info(`[IMPORT MESURES] START`);

  const mesuresToImport = excelParser.parseSheetByIndex({
    sheetIndex: 0,
    content,
    parseOptions: {
      cellDates: true,
      dateNF: "dd/mm/yyyy",
      locale: "fr-FR",
      type: type === "csv" ? "string" : "base64",
      raw: type === "csv" ? true : false
    }
  });

  mesuresToImport.forEach(data => {
    if (data.type) {
      data.type = data.type.toLowerCase();
    }
    if (data.residence) {
      data.residence = data.residence.toLowerCase();
      data.residence = data.residence.replace("a domicile", "domicile");
    }
  });

  logger.info(`[IMPORT MESURES] mesuresToImport: ${mesuresToImport.length}`);

  const {
    errors,
    mesuresWithLine
  } = actionsMesuresImporterSchemaValidator.validateImportData(mesuresToImport);

  const importSummary = await importMesures({
    errors,
    mandataireUserId,
    serviceId,
    mesuresWithLine,
    antennesMap
  });

  importSummary.errors.sort((a, b) => a.line - b.line);

  const durationInSeconds = Math.ceil((Date.now() - start) / 1000);

  if (errors.length) {
    logger.info(
      `[IMPORT MESURES] ERROR (duration: ${durationInSeconds}s, errors: ${errors.length}, to create: ${importSummary.create.length}, to update:  ${importSummary.update.length})`
    );
  } else if (importSummary.invalidAntenneNames.length) {
    logger.info(
      `[IMPORT MESURES] WARNING (duration: ${durationInSeconds}s, invalid antennes: ${importSummary.invalidAntenneNames.length}, to create: ${importSummary.create.length}, to update:  ${importSummary.update.length})`
    );
  } else {
    logger.info(
      `[IMPORT MESURES] SUCCESS (duration: ${durationInSeconds}s, created: ${importSummary.create.length}, updated:  ${importSummary.update.length})`
    );
  }

  return {
    errors: importSummary.errors,
    creationNumber: importSummary.create.length,
    updateNumber: importSummary.update.length,
    invalidAntenneNames:
      importSummary.errors.length === 0 ? importSummary.invalidAntenneNames : []
  };
}

const importMesures = async ({
  errors,
  mandataireUserId,
  serviceId,
  mesuresWithLine,
  antennesMap
}) => {
  const importSummary = {
    create: [],
    update: [],
    errors,
    invalidAntenneNames: []
  };

  let mandataire;
  let service;

  if (serviceId) {
    service = await Service.query().findById(serviceId);
  } else if (mandataireUserId) {
    mandataire = await Mandataire.query().findOne({
      user_id: mandataireUserId
    });
  }

  const cache = {
    tribunalBySiret: {},
    departmentById: {},
    departmentByRegionCode: {},
    serviceAntenneByName: {}
  };

  // save or update mesures
  let counter = 1;
  const size = mesuresWithLine.length;
  for (const { mesure, line } of mesuresWithLine) {
    if (counter === 1 || counter === size || counter % 100 === 0) {
      logger.info(`[IMPORT MESURES] mesure ${counter} / ${size}`);
    }
    const mesureDatas = {
      ...mesure,
      date_ouverture: toDate(mesure.date_ouverture),
      mandataire,
      service,
      status: "Mesure en cours"
    };
    await prepareMesure(mesureDatas, {
      line,
      cache,
      antennesMap,
      importSummary,
      serviceId
    });
    counter++;
  }

  if (
    importSummary.errors.length === 0 &&
    importSummary.invalidAntenneNames.length === 0
  ) {
    // persist changes
    if (importSummary.create.length) {
      logger.info(
        `[IMPORT MESURES] creating ${importSummary.create.length} mesures...`
      );
      // batch insert
      await Mesure.query().insert(importSummary.create);
    }

    if (importSummary.update.length) {
      logger.info(
        `[IMPORT MESURES] updating ${importSummary.update.length} mesures...`
      );
      for (const { id, data } of importSummary.update) {
        await Mesure.query()
          .findById(id)
          .patch(data);
      }
    }

    if (mandataire) {
      await actionsMesuresImporterMesureRepository.updateMandataireMesureStates(
        mandataire.id
      );
    } else if (service) {
      await actionsMesuresImporterMesureRepository.updateServiceMesureStates(
        service.id
      );
    }
  }

  return importSummary;
};

const prepareMesure = async (
  mesureDatas,
  { cache, antennesMap, line, importSummary, serviceId }
) => {
  const {
    mandataire,
    service,
    code_postal,
    ville,
    tribunal_siret
  } = mesureDatas;

  const department = await actionsMesuresImporterGeoRepository.findDepartment({
    mandataire,
    service,
    code_postal,
    cache
  });

  const pays = getMesurePays(code_postal);

  const {
    latitude,
    longitude
  } = await actionsMesuresImporterGeoRepository.getGeoDatas(code_postal, ville);

  // ti
  let ti = await actionsMesuresImporterMesureRepository.findTribunalBySiret(
    tribunal_siret,
    cache.tribunalBySiret
  );

  if (!ti && configuration.inseeAPITribunal) {
    const tiDatas = await inseeAPI.fetchTribunalDatas(tribunal_siret);
    if (tiDatas) {
      const tiGeoDatas = await actionsMesuresImporterGeoRepository.getGeoDatas(
        tiDatas.code_postal,
        tiDatas.ville
      );
      const tiDepartment = await actionsMesuresImporterGeoRepository.findDepartmentFromPostalCode(
        tiDatas.code_postal,
        cache.departmentByRegionCode
      );
      ti = await Tis.query().insert({
        ...tiDatas,
        departement_id: tiDepartment.id,
        latitude: tiGeoDatas ? tiGeoDatas.latitude : null,
        longitude: tiGeoDatas ? tiGeoDatas.longitude : null
      });
    }
  }

  if (!ti) {
    importSummary.errors.push({
      line: line,
      message: `Aucun tribunal ne correspond au SIRET ${tribunal_siret}`
    });
    return;
  }

  if (serviceId && importSummary.errors.length === 0) {
    // if any arror yet: not necessary to provide invalid antennes names
    const antenne_name = mesureDatas.antenne;
    if (antenne_name) {
      const antenne = await actionsMesuresImporterMesureRepository.findAntenne(
        {
          antenne_name,
          service_id: serviceId
        },
        cache.serviceAntenneByName
      );

      if (antenne) {
        mesureDatas.antenne_id = antenne.id;
      } else {
        if (!antenne && antennesMap) {
          mesureDatas.antenne_id = antennesMap[antenne_name];
        }
        if (!mesureDatas.antenne_id) {
          if (!importSummary.invalidAntenneNames.includes(antenne_name)) {
            logger.debug(`Invalid antenne: ${antenne_name}`);
            importSummary.invalidAntenneNames.push(antenne_name);
          }
        }
      }
    }
  }

  const data = {
    date_ouverture: mesureDatas.date_ouverture,
    ville: mesureDatas.ville,
    type: mesureDatas.type,
    status: mesureDatas.status,
    code_postal: mesureDatas.code_postal,
    civilite: mesureDatas.civilite,
    annee: mesureDatas.annee,
    numero_rg: mesureDatas.numero_rg,
    numero_dossier: mesureDatas.numero_dossier,
    mandataire_id: mandataire ? mandataire.id : null,
    service_id: service ? service.id : null,
    antenne_id: mesureDatas.antenne_id,
    residence: mesureDatas.residence,
    department_id: department.id,
    ti_id: ti ? ti.id : null,
    cabinet: mesureDatas.tribunal_cabinet,
    pays,
    longitude,
    latitude
  };

  const [mesure] = await Mesure.query().where({
    numero_rg: data.numero_rg,
    ti_id: ti.id,
    service_id: service ? service.id : null,
    mandataire_id: mandataire ? mandataire.id : null
  });

  if (!mesure) {
    importSummary.create.push(data);
  } else if (mesure.mandataire_id === data.mandataire_id) {
    importSummary.update.push({
      id: mesure.id,
      data
    });
  } else {
    importSummary.errors.push({
      line: line,
      message: `La mesure avec le numéro RG ${mesure.numero_rg} et le tribunal de ${ti.ville} est gérée par un autre MJPM.`
    });
  }
};

const getMesurePays = code_postal => {
  if (code_postal && code_postal.length === 4) {
    return "BE";
  }
  return "FR";
};

const toDate = dateStr => {
  const [day, month, year] = dateStr.split("/").map(x => parseInt(x));
  return new Date(year, month - 1, day);
};

module.exports = actionsMesuresImporter;
