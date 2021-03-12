const { Service, Mandataire } = require("~/models");

module.exports = async function updateGestionnaireMesuresLastUpdate(table, id) {
  let Model;
  switch (table) {
    case "services":
      Model = Service;
      break;
    case "mandataires":
      Model = Mandataire;
      break;
    default:
      throw new Error(
        "unexpected table '" + table + "' in updateGestionnaireLastUpdate"
      );
  }
  return Model.query()
    .update({
      mesures_last_update: new Date(),
    })
    .where("id", id);
};
