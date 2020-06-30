const {
  getTopLevelGlobalStatus,
  enqueteActiviteStatus,
  populationsStatus,
  serviceInformationsStatus,
  servicePersonnelFormationStatus,
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

  const personnelFormation = await servicePersonnelFormationStatus(
    enqueteReponse,
    statusBuildContext
  );

  const status = {
    informations,
    activite,
    populations,
    personnelFormation,
  };

  status.global = getTopLevelGlobalStatus(status);

  return status;
}

module.exports = enqueteServiceStatus;
