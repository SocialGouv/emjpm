const HttpError = require("../../../utils/error/HttpError");
const { Service } = require("../../../models/Service");

async function checkImportMesuresParameters(req) {
  const { role, userId } = req.user;

  const inputParameters = req.body.input;

  const {
    name,
    content,
    serviceId,
    mandataireUserId,
    antennesMap
  } = inputParameters;

  if (!serviceId && !mandataireUserId) {
    throw new HttpError(
      422,
      "Invalid parameters: serviceId or mandataireUserId is required"
    );
  }

  let importContext;
  if (role === "admin") {
    // ADMIN
    importContext = serviceId ? { serviceId } : { mandataireUserId };
  } else if (role === "service") {
    // SERVICE
    if (!serviceId) {
      throw new HttpError(422, "Invalid parameters: serviceId is required");
    }
    const service = await Service.query().findById(serviceId);
    if (!service || service.id !== serviceId) {
      throw new HttpError(403, "Access denied: invalid serviceId");
    }
    importContext = { serviceId };
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
    importContext = { mandataireUserId };
  } else {
    throw new HttpError(403, "Unexpected user");
  }

  const importMesuresParameters = {
    file: {
      content,
      type: name.endsWith(".xls") || name.endsWith(".xlsx") ? "xls" : "csv"
    },
    importContext,
    antennesMap: antennesMap ? JSON.parse(antennesMap) : undefined
  };
  return importMesuresParameters;
}

module.exports = checkImportMesuresParameters;
