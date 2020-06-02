const {
  graphqlFetch,
  backendAuthHeaders
} = require("../../../../utils/graphql-fetcher");
const { ENQUETE_REPONSE_MANDATAIRE_PREPOSE } = require("./queries");
const logger = require("../../../../utils/logger");
const { createEmptyEnqueteReponse } = require("./requests");

async function getEnqueteReponseMandatairePrepose({ enqueteId, mandataireId }) {
  try {
    const { data, errors } = await graphqlFetch(
      {
        enqueteId,
        mandataireId
      },
      ENQUETE_REPONSE_MANDATAIRE_PREPOSE,
      backendAuthHeaders
    );

    if (errors && errors.length) {
      errors.map(error => logger.error(error));
    }

    const { enquete_reponses } = data;
    const [enqueteReponse] = enquete_reponses;
    return enqueteReponse;
  } catch (err) {
    logger.error(err);
    return null;
  }
}

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
