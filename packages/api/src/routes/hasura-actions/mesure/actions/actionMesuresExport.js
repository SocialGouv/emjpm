const XLSX = require("xlsx");

const getMesures = require("~/services/getMesures");

module.exports = async (req, res, next) => {
  try {
    const { userId, serviceId } = req.user;
    const mesures = await getMesures({ serviceId, userId });
    const exportedMesures = mesures.map((mesure) => {
      const {
        numero_rg,
        numero_dossier,
        date_nomination,
        code_postal,
        ville,
        pays,
        civilite,
        annee_naissance,
        lieu_vie,
        nature_mesure,
        champ_mesure,
        tis,
        cabinet,
      } = mesure;
      return {
        annee_naissance,
        cabinet,
        champ_mesure,
        civilite,
        code_postal,
        date_nomination,
        lieu_vie,
        nature_mesure,
        numero_dossier,
        numero_rg,
        pays,
        tribunal: tis ? tis.etablissement : "",
        ville,
      };
    });
    if (mesures.length) {
      var ws = XLSX.utils.json_to_sheet(exportedMesures, {
        header: Object.keys(exportedMesures[0]),
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Mesures eMJPM");
      res.header("Content-Type", "application/octet-stream");
      res.attachment("export_mesures.xlsx");

      var wopts = { bookSST: false, bookType: "xlsx", type: "base64" };
      var wbout = XLSX.write(wb, wopts);

      return res.send({ data: wbout });
    } else {
      return res.status(404).end();
    }
  } catch (err) {
    return next(err);
  }
};
