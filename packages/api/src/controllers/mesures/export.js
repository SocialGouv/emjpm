var XLSX = require("xlsx");

const getMesures = require("../../services/getMesures");

const exportMesures = async (req, res) => {
  const { user } = req;
  const mesures = await getMesures(user.id, user.type);
  if (mesures.length) {
    var ws = XLSX.utils.json_to_sheet(mesures, {
      header: Object.keys(mesures[0]),
    });
    res.header("Content-Type", "text/csv");
    res.attachment("test.csv");
    return res.send(XLSX.utils.sheet_to_csv(ws));
  } else {
    return res.status(404).end();
  }
};

module.exports = exportMesures;
