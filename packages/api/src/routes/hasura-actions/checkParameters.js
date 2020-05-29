const HttpError = require("../../utils/error/HttpError");
const { Service } = require("../../models/Service");
const { Mandataire } = require("../../models/Mandataire");

async function checkEnqueteIndividuelParameters(req, res) {
  const { enqueteId, mandataireId } = req.body.input;
  if (!enqueteId || !mandataireId) {
    res.status(422).json({
      message: "Invalid parameters: enqueteId or mandataireId is required"
    });
  }
}

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

async function checkImportEnqueteParameters(req) {
  const { role, userId: authUserId } = req.user;

  const inputParameters = req.body.input;

  const { content, enqueteId, userId } = inputParameters;

  if (!userId) {
    throw new HttpError(422, "Invalid parameters: 'userId' is required");
  }

  const importContext = {
    enqueteId,
    userId,
    service: undefined,
    mandataire: undefined
  };

  if (role === "service") {
    // SERVICE
    if (userId !== authUserId) {
      throw new HttpError(403, "Access denied: invalid serviceId");
    }
    importContext.service = await Service.query().findOne({
      user_id: userId
    });
    throw new HttpError(400, "Not supported yet (service)");
  } else if (role === "individuel") {
    // MANDATAIRE INDIVIDUEL
    if (userId !== authUserId) {
      throw new HttpError(403, "Access denied: invalid 'userId'");
    }
    importContext.mandataire = await Mandataire.query().findOne({
      user_id: userId
    });
  } else {
    throw new HttpError(403, "Invalid user");
  }

  const importEnqueteParameters = {
    file: {
      content
    },
    importContext
  };
  return importEnqueteParameters;
}

module.exports = {
  checkEnqueteIndividuelParameters,
  checkImportMesuresParameters,
  checkImportEnqueteParameters
};
