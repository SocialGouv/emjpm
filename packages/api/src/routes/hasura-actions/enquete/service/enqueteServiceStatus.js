const {
  getTopLevelGlobalStatus,
  enqueteActiviteStatus,
  populationsStatus,
  serviceInformationsStatus,
} = require("../common/enquete-status");

async function enqueteServiceStatus(enqueteReponse) {
  const statusBuildContext = {
    allowEmpty: true,
  };

  const informations = await serviceInformationsStatus(
    enqueteReponse,
    statusBuildContext
  );

  const activite = await enqueteActiviteStatus(
    enqueteReponse,
    statusBuildContext
  );

  const populations = await populationsStatus(
    enqueteReponse,
    statusBuildContext
  );

  const status = {
    informations,
    activite,
    populations,
  };

  status.global = getTopLevelGlobalStatus(
    Object.values(status).map((x) => x.global)
  );
  return status;
}

module.exports = enqueteServiceStatus;
