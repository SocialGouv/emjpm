const updater = require("~/services/updateMesureStates");

async function updateMesureStates(serviceOrMandataire, type) {
  if (type === "mandataire") {
    await updater.updateMandataireMesureStates(serviceOrMandataire.id);
  } else {
    await updater.updateServiceMesureStates(serviceOrMandataire.id);
  }
}

module.exports = updateMesureStates;
