const {
  getTopLevelGlobalStatus,
  enqueteActiviteStatus,
  populationsStatus,
} = require("../common/enquete-status");

async function enqueteMandatairePreposeStatus(enqueteReponse) {
  const statusBuildContext = {
    allowEmpty: true,
  };

  const activite = await enqueteActiviteStatus(
    enqueteReponse,
    statusBuildContext
  );

  const populations = await populationsStatus(
    enqueteReponse,
    statusBuildContext
  );

  const status = {
    activite,
    populations,
  };

  status.global = getTopLevelGlobalStatus(
    Object.values(status).map((x) => x.global)
  );
  return status;
}

module.exports = enqueteMandatairePreposeStatus;
