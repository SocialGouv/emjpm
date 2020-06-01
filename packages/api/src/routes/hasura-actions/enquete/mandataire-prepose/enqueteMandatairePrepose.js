const {
  getEnqueteReponseMandatairePrepose,
  createEmptyEnqueteReponse
} = require("./requests");

async function initEnqueteMandatairePrepose({ enqueteId, mandataireId }) {
  let enqueteReponse = await getEnqueteReponseMandatairePrepose({
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

module.exports = { initEnqueteMandatairePrepose };
