const updater = require("~/services/updateMesureStates");

async function updateMesureStates(serviceOrMandataire, type, trx) {
  if (type === "mandataire") {
    await updater.updateMandataireMesureStates(serviceOrMandataire.id, trx);
  } else {
    await updater.updateServiceMesureStates(serviceOrMandataire.id, trx);
  }
}

module.exports = updateMesureStates;
