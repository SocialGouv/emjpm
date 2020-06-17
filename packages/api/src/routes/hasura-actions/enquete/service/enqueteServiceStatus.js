const { getTopLevelGlobalStatus } = require("../common/enquete-status");

async function enqueteMandatairePreposeStatus() {
  const status = {};
  status.global = getTopLevelGlobalStatus(
    Object.values(status).map((x) => x.global)
  );
  return status;
}

module.exports = enqueteMandatairePreposeStatus;
