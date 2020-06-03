const {
  EnqueteReponsesPopulations
} = require("../../../../models/EnqueteReponsesPopulations");
const {
  EnqueteReponsesModalitesExercice
} = require("../../../../models/EnqueteReponsesModalitesExercice");
const { getEnqueteReponse, createEmptyEnqueteReponse } = {
  getEnqueteReponse: undefined,
  createEmptyEnqueteReponse: undefined
};
// const {
//   getEnqueteReponse,
//   createEmptyEnqueteReponse
// } = require("../prepose/requests");

async function update(enqueteId, { tabs, mandataireId }) {
  if (!getEnqueteReponse) {
    throw new Error("NOT IMPLEMENTED");
  }

  const { populations, modaliteExercice } = tabs;

  const enqueteReponse = await initEnqueteMandataireIndividuel({
    enqueteId,
    mandataireId
  });

  await EnqueteReponsesPopulations.query()
    .findById(enqueteReponse.enquete_reponses_populations_id)
    .patch(populations);

  await EnqueteReponsesModalitesExercice.query()
    .findById(enqueteReponse.enquete_reponses_modalites_exercice_id)
    .patch(modaliteExercice);
}

async function initEnqueteMandataireIndividuel({ enqueteId, mandataireId }) {
  if (!getEnqueteReponse) {
    throw new Error("NOT IMPLEMENTED");
  }
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

const preposeEnqueteRepository = {
  update
};

module.exports = preposeEnqueteRepository;
