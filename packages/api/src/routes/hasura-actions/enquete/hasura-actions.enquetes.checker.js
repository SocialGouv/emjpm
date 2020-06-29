const HttpError = require("../../../utils/error/HttpError");
const { Service } = require("../../../models/Service");
const { ServiceMember } = require("../../../models/ServiceMember");
const { Mandataire } = require("../../../models/Mandataire");
const { EnqueteReponses } = require("../../../models/EnqueteReponses");
const logger = require("../../../utils/logger");

async function checkEnqueteContext(req) {
  const { role, userId } = req.user;

  const inputParameters = req.body.input;
  const { enqueteId, reponseId } = inputParameters;

  if (!userId && !reponseId) {
    throw new HttpError(
      422,
      "Invalid parameters: 'userId' or 'reponseId' is required"
    );
  }

  const context = {
    enqueteId,
    userId,
    user_type: undefined,
    serviceId: undefined,
    mandataireId: undefined,
  };

  switch (role) {
    case "service": {
      // SERVICE
      const serviceMember = await ServiceMember.query().findOne({
        user_id: userId,
      });

      if (serviceMember) {
        const service = await Service.query().findOne({
          id: serviceMember.service_id,
        });
        context.serviceId = service.id;
        context.user_type = "service";
      } else {
        throw new HttpError(404, "Service member not found");
      }
      break;
    }
    case "individuel": {
      // MANDATAIRE INDIVIDUEL
      const mandataire = await Mandataire.query().findOne({
        user_id: userId,
      });
      context.mandataireId = mandataire.id;
      context.user_type = "individuel";
      break;
    }
    case "prepose": {
      // MANDATAIRE PREPOSE
      const mandataire = await Mandataire.query().findOne({
        user_id: userId,
      });
      context.mandataireId = mandataire.id;
      context.user_type = "prepose";
      break;
    }
    case "direction": {
      // DIRECTION

      if (reponseId) {
        const reponse = await EnqueteReponses.query().findOne({
          id: reponseId,
        });

        if (!reponse) {
          throw new HttpError(404, "Reponse not found");
        }
        if (reponse.status === "draft") {
          throw new HttpError(404, "Reponse has not been submitted yet");
        }
        context.serviceId = reponse.service_id;
        context.mandataireId = reponse.mandataire_id;
        context.user_type = reponse.user_type;
      } else {
        throw new HttpError(422, "Invalid parameters: 'reponseId' is required");
      }
      break;
    }

    default: {
      logger.error(`Invalid user role "${role}"`);
      throw new HttpError(403, "Invalid user");
    }
  }

  return context;
}

module.exports = checkEnqueteContext;
