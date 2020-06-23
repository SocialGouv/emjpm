const HttpError = require("../../../utils/error/HttpError");
const { Service } = require("../../../models/Service");
const { ServiceMember } = require("../../../models/ServiceMember");
const { Mandataire } = require("../../../models/Mandataire");

async function checkEnqueteContext(req) {
  const { role, userId } = req.user;

  const inputParameters = req.body.input;
  const { enqueteId } = inputParameters;

  if (!userId) {
    throw new HttpError(422, "Invalid parameters: 'userId' is required");
  }

  const context = {
    role,
    enqueteId,
    userId,
    service: undefined,
    mandataire: undefined,
  };

  if (role === "service") {
    // SERVICE

    const serviceMember = await ServiceMember.query().findOne({
      user_id: userId,
    });

    if (serviceMember) {
      context.service = await Service.query().findOne({
        id: serviceMember.service_id,
      });
    }
  } else if (role === "individuel") {
    // MANDATAIRE INDIVIDUEL
    context.mandataire = await Mandataire.query().findOne({
      user_id: userId,
    });
  } else if (role === "prepose") {
    // MANDATAIRE PREPOSE
    context.mandataire = await Mandataire.query().findOne({
      user_id: userId,
    });
  } else {
    throw new HttpError(403, "Invalid user");
  }

  return context;
}

module.exports = checkEnqueteContext;
