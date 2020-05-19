const HttpError = require("../../../utils/error/HttpError");
// const { Service } = require("../../../models/Service");

async function checkImportEnqueteParameters(req) {
  const { role, userId } = req.user;

  const inputParameters = req.body.input;

  const { base64str, enqueteId, serviceId, mandataireUserId } = inputParameters;

  if (!serviceId && !mandataireUserId) {
    throw new HttpError(
      422,
      "Invalid parameters: serviceId or mandataireUserId is required"
    );
  }

  let importContext;
  if (role === "admin") {
    // ADMIN
    throw new HttpError(400, "Not supported yet (admin)");
    // importContext = serviceId ? { enqueteId, serviceId } : { enqueteId, mandataireUserId };
  } else if (role === "service") {
    // SERVICE
    throw new HttpError(400, "Not supported yet (service)");
    // if (!serviceId) {
    //   throw new HttpError(422, "Invalid parameters: serviceId is required");
    // }
    // const service = await Service.query().findById(serviceId);
    // if (!service || service.id !== serviceId) {
    //   throw new HttpError(403, "Access denied: invalid serviceId");
    // }
    // importContext = { enqueteId, serviceId };
  } else if (role === "individuel") {
    // MANDATAIRE INDIVIDUEL
    if (!mandataireUserId) {
      throw new HttpError(
        422,
        "Invalid parameters: mandataireUserId is required"
      );
    }
    if (userId !== mandataireUserId) {
      throw new HttpError(403, "Access denied: invalid mandataireUserId");
    }
    importContext = { enqueteId, mandataireUserId };
  } else {
    throw new HttpError(403, "Unexpected user");
  }

  const importEnqueteParameters = {
    file: {
      base64str
    },
    importContext
  };
  return importEnqueteParameters;
}

module.exports = checkImportEnqueteParameters;
