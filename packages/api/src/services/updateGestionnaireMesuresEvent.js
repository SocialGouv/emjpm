const updateGestionnaireMesuresCounters = require("~/services/updateGestionnaireMesuresCounters");
const updateGestionnaireMesuresLastUpdate = require("~/services/updateGestionnaireMesuresLastUpdate");

module.exports = async function updateGestionnaireMesuresEvent(
  tableOrType,
  id,
  trx
) {
  await updateGestionnaireMesuresCounters(tableOrType, id, trx);
  const affectedRows = await updateGestionnaireMesuresLastUpdate(
    tableOrType,
    id,
    trx
  );
  return affectedRows;
};
