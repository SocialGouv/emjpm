const updateGestionnaireMesuresCounters = require("~/services/updateGestionnaireMesuresCounters");
const updateGestionnaireMesuresLastUpdate = require("~/services/updateGestionnaireMesuresLastUpdate");

module.exports = async function updateGestionnaireMesuresEvent(
  tableOrType,
  id
) {
  await updateGestionnaireMesuresCounters(tableOrType, id);
  const affectedRows = await updateGestionnaireMesuresLastUpdate(
    tableOrType,
    id
  );
  return affectedRows;
};
