const { Service, Mandataire } = require("~/models");

module.exports = async function updateGestionnaireMesuresLastUpdate(
  tableOrType,
  id,
  trx
) {
  let Model;
  switch (tableOrType) {
    case "service":
    case "services":
      Model = Service;
      break;
    case "mandataire":
    case "mandataires":
      Model = Mandataire;
      break;
    default:
      throw new Error(
        "unexpected table '" + tableOrType + "' in updateGestionnaireLastUpdate"
      );
  }
  return Model.query(trx)
    .update({
      mesures_last_update: new Date(),
    })
    .where("id", id);
};
