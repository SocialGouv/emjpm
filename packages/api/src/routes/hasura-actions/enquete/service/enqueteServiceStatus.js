const {
  getTopLevelGlobalStatus,
  enqueteActiviteStatus,
} = require("../common/enquete-status");

async function enqueteMandatairePreposeStatus(enqueteReponse) {
  const statusBuildContext = {
    allowEmpty: true,
  };

  const activite = await enqueteActiviteStatus(
    enqueteReponse,
    statusBuildContext
  );

  const status = {
    activite,
  };

  status.global = getTopLevelGlobalStatus(
    Object.values(status).map((x) => x.global)
  );
  return status;
}

module.exports = enqueteMandatairePreposeStatus;
