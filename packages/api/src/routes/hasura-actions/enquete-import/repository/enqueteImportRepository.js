const {
  EnqueteReponsesInformationsMandataire
} = require("../../../../models/EnqueteReponsesInformationsMandataire");
const {
  EnqueteReponsesPopulations
} = require("../../../../models/EnqueteReponsesPopulations");
const {
  EnqueteReponsesAgrementsFormations
} = require("../../../../models/EnqueteReponsesAgrementsFormations");
const logger = require("../../../../utils/logger");

async function saveInformationsMandataire(id, data) {
  const entity = await EnqueteReponsesInformationsMandataire.query()
    .findById(id)
    .patch(data);

  logger.info(
    `[IMPORT ENQUETE] informationsMandataire: ${JSON.stringify(
      entity,
      undefined,
      2
    )}`
  );
  return entity;
}
async function saveEnqueteReponsesAgrementsFormations(id, data) {
  const entity = await EnqueteReponsesAgrementsFormations.query()
    .findById(id)
    .patch(data);

  logger.info(
    `[IMPORT ENQUETE] agrementsFormations: ${JSON.stringify(
      entity,
      undefined,
      2
    )}`
  );
  return entity;
}

async function savePopulations(id, data) {
  return await EnqueteReponsesPopulations.query()
    .findById(id)
    .patch(data);
}

const enqueteImportRepository = {
  saveInformationsMandataire,
  savePopulations,
  saveEnqueteReponsesAgrementsFormations
};

module.exports = enqueteImportRepository;
