const {
  EnqueteReponsesInformationsMandataire
} = require("../../../../models/EnqueteReponsesInformationsMandataire");
const {
  EnqueteReponsesPopulations
} = require("../../../../models/EnqueteReponsesPopulations");

async function saveInformationsMandataire(id, data) {
  return await EnqueteReponsesInformationsMandataire.query()
    .findById(id)
    .patch(data);
}

async function savePopulations(id, data) {
  return await EnqueteReponsesPopulations.query()
    .findById(id)
    .patch(data);
}

const enqueteImportRepository = {
  saveInformationsMandataire,
  savePopulations
};

module.exports = enqueteImportRepository;
