const {
  EnqueteReponsesPopulations
} = require("../../../../models/EnqueteReponsesPopulations");
const {
  EnqueteReponsesPrestationsSociales
} = require("../../../../models/EnqueteReponsesPrestationsSociales");
const {
  EnqueteReponsesAgrementsFormations
} = require("../../../../models/EnqueteReponsesAgrementsFormations");
const {
  EnqueteReponsesInformationsMandataire
} = require("../../../../models/EnqueteReponsesInformationsMandataire");
const {
  getEnqueteReponse,
  createEmptyEnqueteReponse
} = require("../mandataire-individuel/requests");

async function update(enqueteId, { tabs, mandataireId }) {
  const {
    informationsMandataire,
    agrementsFormations,
    populations,
    prestationsSociales
  } = tabs;

  const enqueteReponse = await initEnqueteMandataireIndividuel({
    enqueteId,
    mandataireId
  });

  await EnqueteReponsesInformationsMandataire.query()
    .findById(enqueteReponse.enquete_reponses_informations_mandataire_id)
    .patch(informationsMandataire);

  await EnqueteReponsesAgrementsFormations.query()
    .findById(enqueteReponse.enquete_reponses_agrements_formations_id)
    .patch(agrementsFormations);

  await EnqueteReponsesPopulations.query()
    .findById(enqueteReponse.enquete_reponses_populations_id)
    .patch(populations);

  await EnqueteReponsesPrestationsSociales.query()
    .findById(enqueteReponse.enquete_reponses_prestations_sociale_id)
    .patch(prestationsSociales);
}
async function initEnqueteMandataireIndividuel({ enqueteId, mandataireId }) {
  let enqueteReponse = await getEnqueteReponse({
    enqueteId,
    mandataireId
  });

  if (!enqueteReponse) {
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId
    });
    enqueteReponse = insert_enquete_reponses_one;
  }
  return enqueteReponse;
}

const mandataireIndividuelEnqueteRepository = {
  update
};

module.exports = mandataireIndividuelEnqueteRepository;
