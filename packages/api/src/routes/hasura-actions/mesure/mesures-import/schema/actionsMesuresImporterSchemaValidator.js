const {
  actionsMesuresImporterSchema,
} = require("./actionsMesuresImporterSchema");

const HEADERS = [
  "date_ouverture",
  "type",
  "code_postal",
  "ville",
  "civilite",
  "annee",
  "numero_rg",
  "numero_dossier",
  "residence",
  "tribunal_siret",
  "tribunal_cabinet",
  "antenne",
];

const validateHeaders = (row) => {
  return Object.keys(row)
    .map((key) => {
      if (!HEADERS.includes(key)) {
        return {
          line: 1,
          message: `Le titre de la colonne '${key}' n'est pas valide`,
        };
      }
    })
    .filter(Boolean);
};

module.exports = {
  validateImportData: (rows) => {
    const [headers] = rows;
    const mesuresWithLine = [];
    const errors = [...validateHeaders(headers)];

    if (errors.length) {
      return { errors, mesuresWithLine: [] };
    }

    rows.forEach((row, i) => {
      try {
        actionsMesuresImporterSchema.validateSync(row);
        mesuresWithLine.push({
          line: i + 2,
          mesure: row,
        });
      } catch (error) {
        errors.push({
          line: i + 2,
          message: `${error.path} ${error.message}`,
          row,
        });
      }
    });

    return { errors, mesuresWithLine };
  },
};
