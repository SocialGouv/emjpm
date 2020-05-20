const {
  EnqueteReponsesInformationsMandataire
} = require("../../../../models/EnqueteReponsesInformationsMandataire");

async function saveInformationsMandataire(id, data) {
  return await EnqueteReponsesInformationsMandataire.query()
    .findById(id)
    .patch(data);
}

const enqueteImportRepository = {
  saveInformationsMandataire
};

module.exports = enqueteImportRepository;
