const logger = require("../../utils/logger");
const {
  getEnqueteReponse,
  createEmptyEnqueteReponse
} = require("../../graphql/enquete");

module.exports = async (req, res, next) => {
  const { body } = req;
  const { enqueteId, userId } = body.input;

  let enqueteReponse;

  try {
    const data = await getEnqueteReponse({
      enqueteId,
      userId
    });

    const mandataireId = data.mandataireId;
    enqueteReponse = data.enqueteReponse;

    if (!enqueteReponse) {
      const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
        enqueteId,
        mandataireId
      });
      enqueteReponse = insert_enquete_reponses_one;
    }

    return res.json({
      enquete_id: enqueteReponse.enquete_id,
      enquete_reponses_id: enqueteReponse.id,
      enquete_reponses_informations_mandataire_id:
        enqueteReponse.enquete_reponses_informations_mandataire_id,
      enquete_reponses_informations_mandataire_status: 0,
      enquete_reponses_prestations_sociale_id:
        enqueteReponse.enquete_reponses_prestations_sociale_id,
      enquete_reponses_prestations_sociale_status: 0,
      enquete_reponses_agrements_formations_id:
        enqueteReponse.enquete_reponses_agrements_formations_id,
      enquete_reponses_agrements_formations_status: 0,
      enquete_reponses_activite_id: enqueteReponse.enquete_reponses_activite_id,
      enquete_reponses_activite_status: 0,
      enquete_reponses_populations_id:
        enqueteReponse.enquete_reponses_populations_id,
      enquete_reponses_populations_status: 0
    });
  } catch (err) {
    logger.error(err.message);
    next();
  }
};
