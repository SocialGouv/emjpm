const {
  getEnqueteReponseMandatairePrepose,
  createEmptyEnqueteReponse
} = require("./requests");
const enqueteMandatairePreposeStatus = require("./enqueteMandatairePreposeStatus");

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
  const status = await enqueteMandatairePreposeStatus(enqueteReponse);
  return {
    ...enqueteReponse,
    status
  };
}

module.exports = { initEnqueteMandatairePrepose };
