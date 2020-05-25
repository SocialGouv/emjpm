const {
  graphqlFetch,
  backendAuthHeaders
} = require("../../../utils/graphql-fetcher");
const { ENQUETE_REPONSE_MANDATAIRE_PREPOSE } = require("./queries");
const logger = require("../../../utils/logger");

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
  const enqueteReponseMandatairePrepose = await getEnqueteReponseMandatairePrepose(
    {
      enqueteId,
      mandataireId
    }
  );

  if (!enqueteReponseMandatairePrepose) {
    // TODO(remiroyc): create empty enquete reponse
  }

  return enqueteReponseMandatairePrepose;
}

module.exports = { initEnqueteMandatairePrepose };
