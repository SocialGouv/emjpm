import { serviceMesureImportSchema } from "../../lib/validationSchemas";

export const HEADERS = [
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
  "antenne"
];

const validateHeaders = row => {
  return Object.keys(row)
    .map(key => {
      if (!HEADERS.includes(key)) {
        return {
          line: 0,
          message: `Le titre de la colonne '${key}' n'est pas valide`
        };
      }
    })
    .filter(Boolean);
};

export default rows => {
  const [headers] = rows;
  const mesures = [];
  const errors = [...validateHeaders(headers)];

  if (errors.length) {
    return { errors, mesures: [] };
  }

  rows.forEach((row, index) => {
    try {
      serviceMesureImportSchema.validateSync(row);
      mesures.push(row);
    } catch (error) {
      errors.push({
        line: index + 1,
        message: `${error.path} ${error.message}`,
        row
      });
    }
  });

  return { errors, mesures };
};
