const {
  MESURE_PROTECTION,
  MESURE_PROTECTION_STATUS,
  isFrance,
} = require("@emjpm/core");
const excelParser = require("~/utils/file/excelParser");
const logger = require("~/utils/logger");

const { Service } = require("~/models/Service");
const actionsMesuresImporterGeoRepository = require("./repository/actionsMesuresImporterGeoRepository");
const actionsMesuresImporterMesureRepository = require("./repository/actionsMesuresImporterMesureRepository");
const { Mandataire } = require("~/models/Mandataire");
const actionsMesuresImporterSchemaValidator = require("./schema/actionsMesuresImporterSchemaValidator");
const { Mesure } = require("~/models/Mesure");

const mesureStatesService = require("~/services/updateMesureStates");
const { MesureEtat } = require("~/models/MesureEtat");
const { MesureRessources } = require("~/models/MesureRessources");

const actionsMesuresImporter = {
  importMesuresFile,
};

async function importMesuresFile({
  file: { content, type },
  importContext: {
    // mandataireUserId & serviceId are mutually exclusive
    mandataireUserId,
    serviceId,
  },
  antennesMap,
}) {
  const start = Date.now();
  logger.info(`[IMPORT MESURES] START`);

  const mesuresToImport = excelParser.parseSheetByIndex({
    content,
    parseOptions: {
      cellDates: true,
      dateNF: "dd/mm/yyyy",
      locale: "fr-FR",
      raw: type === "csv" ? true : false,
      type: type === "csv" ? "string" : "base64",
    },
    sheetIndex: 0,
  });

  mesuresToImport.forEach((data) => {
    if (data.type) {
      data.type = data.type.toLowerCase();
    }
    if (data.residence) {
      data.residence = data.residence.toLowerCase();
      data.residence = data.residence.replace("a domicile", "domicile");
      data.residence = data.residence.replace("sdf", "SDF");
    }
  });

  logger.info(`[IMPORT MESURES] mesuresToImport: ${mesuresToImport.length}`);

  const {
    errors,
    mesuresWithLine,
  } = actionsMesuresImporterSchemaValidator.validateImportData(mesuresToImport);

  const importSummary = await importMesures({
    antennesMap,
    errors,
    mandataireUserId,
    mesuresWithLine,
    serviceId,
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
    creationNumber: importSummary.create.length,
    errors: importSummary.errors,
    invalidAntenneNames:
      importSummary.errors.length === 0
        ? importSummary.invalidAntenneNames
        : [],
    updateNumber: importSummary.update.length,
  };
}

const importMesures = async ({
  errors,
  mandataireUserId,
  serviceId,
  mesuresWithLine,
  antennesMap,
}) => {
  const importSummary = {
    create: [],
    errors,
    invalidAntenneNames: [],
    update: [],
  };

  let mandataire;
  let service;

  if (serviceId) {
    service = await Service.query().findById(serviceId);
  } else if (mandataireUserId) {
    mandataire = await Mandataire.query().findOne({
      user_id: mandataireUserId,
    });
  }

  const cache = {
    departmentById: {},
    departmentByRegionCode: {},
    serviceAntenneByName: {},
    tribunalBySiret: {},
  };

  // save or update mesures
  let counter = 1;
  const size = mesuresWithLine.length;
  for (const { mesure, line } of mesuresWithLine) {
    if (counter === 1 || counter === size || counter % 100 === 0) {
      logger.info(`[IMPORT MESURES] mesure ${counter} / ${size}`);
    }

    const lieu_vie = mesure.residence
      ? MESURE_PROTECTION.LIEU_VIE_MAJEUR.byValue[mesure.residence]
      : null;
    delete mesure.residence;

    const nature_mesure = adaptNatureMesure(mesure.type);
    const champ_mesure = adaptChampMesure(mesure.type);
    delete mesure.type;

    let civilite;
    const sexe = mesure.civilite;
    if (sexe && sexe === "H") {
      civilite = "monsieur";
    } else if (sexe && sexe === "F") {
      civilite = "madame";
    }

    const mesureDatas = {
      ...mesure,
      champ_mesure,
      civilite,
      date_nomination: toDate(mesure.date_ouverture),
      lieu_vie,
      mandataire,
      nature_mesure,
      service,
      status: MESURE_PROTECTION_STATUS.en_cours,
    };
    await prepareMesure(mesureDatas, {
      antennesMap,
      cache,
      importSummary,
      line,
      serviceId,
    });
    counter++;
  }

  if (
    importSummary.errors.length === 0 &&
    importSummary.invalidAntenneNames.length === 0
  ) {
    const type = service ? "service" : "mandataire";
    const filters = {
      status: "en_cours",
      [`${type}_id`]: service ? service.id : mandataire.id,
    };
    const subQuery = Mesure.query().select("id").where(filters);
    await MesureEtat.query().delete().whereIn("mesure_id", subQuery);
    await MesureRessources.query().delete().whereIn("mesure_id", subQuery);
    await Mesure.query().delete().where(filters);

    for (const data of importSummary.create) {
      await Mesure.query().insertGraph(data);
    }

    if (mandataire) {
      await mesureStatesService.updateMandataireMesureStates(mandataire.id);
    } else if (service) {
      await mesureStatesService.updateServiceMesureStates(service.id);
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
    tribunal_siret,
  } = mesureDatas;

  const department = await actionsMesuresImporterGeoRepository.findDepartment({
    cache,
    code_postal,
    mandataire,
    service,
  });

  const pays = getMesurePays(code_postal);

  let latitude;
  let longitude;

  if (isFrance(pays)) {
    const geoData = await actionsMesuresImporterGeoRepository.getGeoDatas(
      code_postal,
      ville
    );
    latitude = geoData.latitude;
    longitude = geoData.longitude;
  }

  // ti
  const ti = await actionsMesuresImporterMesureRepository.findTribunalBySiret(
    tribunal_siret,
    cache.tribunalBySiret
  );

  if (!ti) {
    importSummary.errors.push({
      line: line,
      message: `Aucun tribunal ne correspond au SIRET ${tribunal_siret}`,
    });
    return;
  }

  if (serviceId && importSummary.errors.length === 0) {
    const antenne_name = mesureDatas.antenne;
    if (antenne_name) {
      const antenne = await actionsMesuresImporterMesureRepository.findAntenne(
        {
          antenne_name,
          service_id: serviceId,
        },
        cache.serviceAntenneByName
      );

      if (antenne) {
        mesureDatas.antenne_id = antenne.id;
      } else {
        if (!antenne && antennesMap) {
          const key = antennesMap[antenne_name];
          if (key) {
            mesureDatas.antenne_id = parseInt(key);
          }
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
    annee_naissance: mesureDatas.annee,
    antenne_id: mesureDatas.antenne_id,
    cabinet: mesureDatas.tribunal_cabinet,
    champ_mesure: mesureDatas.champ_mesure,
    civilite: mesureDatas.civilite,
    code_postal: mesureDatas.code_postal,
    date_nomination: mesureDatas.date_nomination,
    department_id: department.id,
    etats: [
      {
        champ_mesure: mesureDatas.champ_mesure,
        code_postal: mesureDatas.code_postal,
        date_changement_etat: mesureDatas.date_nomination,
        lieu_vie: mesureDatas.lieu_vie,
        nature_mesure: mesureDatas.nature_mesure,
        pays,
        ville: mesureDatas.ville,
      },
    ],
    latitude,
    lieu_vie: mesureDatas.lieu_vie,
    longitude,
    mandataire_id: mandataire ? mandataire.id : null,
    nature_mesure: mesureDatas.nature_mesure,
    numero_dossier: mesureDatas.numero_dossier,
    numero_rg: mesureDatas.numero_rg,
    pays,
    service_id: service ? service.id : null,
    status: mesureDatas.status,
    ti_id: ti ? ti.id : null,
    ville: mesureDatas.ville,
  };

  importSummary.create.push(data);
};

const getMesurePays = (code_postal) => {
  if (code_postal && code_postal.length === 4) {
    return "BE";
  }
  return "FR";
};

const toDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/").map((x) => parseInt(x));
  return new Date(year, month - 1, day);
};

function adaptChampMesure(type) {
  switch (type) {
    case "tutelle à la personne":
    case "curatelle simple à la personne":
    case "curatelle renforcée à la personne":
      return "protection_personne";
    case "curatelle simple aux biens":
    case "curatelle renforcée aux biens":
    case "tutelle aux biens":
      return "protection_bien";
    case "curatelle simple aux biens et à la personne":
    case "tutelle aux biens et à la personne":
    case "curatelle renforcée aux biens et à la personne":
      return "protection_bien_personne";
    default:
      return null;
  }
}

function adaptNatureMesure(type) {
  if (type === null || type === undefined) {
    return null;
  }
  switch (type) {
    case "curatelle":
    case "curatelle simple":
    case "curatelle simple à la personne":
    case "curatelle simple aux biens":
    case "curatelle simple aux biens et à la personne":
      return "curatelle_simple";
    case "curatelle renforcée":
    case "curatelle renforcée à la personne":
    case "curatelle renforcée aux biens":
    case "curatelle renforcée aux biens et à la personne":
      return "curatelle_renforcee";
    case "maj":
      return "mesure_accompagnement_judiciaire";
    case "mandat de protection future":
      return "mandat_protection_future";
    case "mesure ad hoc":
      return "mesure_ad_hoc";
    case "sauvegarde de justice":
    case "sauvegarde de justice avec mandat spécial":
      return "sauvegarde_justice";
    case "subrogé curateur":
      return "subroge_curateur";
    case "subrogé tuteur":
      return "subroge_tuteur";
    case "tutelle":
    case "tutelle à la personne":
    case "tutelle aux biens":
    case "tutelle aux biens et à la personne":
      return "tutelle";
    default:
      throw new Error(`unknown type ${type}`);
  }
}

module.exports = actionsMesuresImporter;
