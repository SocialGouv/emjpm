import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE } from "./yup";

const serviceSchema = yup.object().shape({
  competences: yup.string().max(255, "Maximum 255 caractères"),
  dispo_max: yup
    .number()
    .required()
    .test(
      "dispo-total",
      "La disponibilité globale ne doit pas être inférieur à la disponibilité totale par département",
      (value, ctx) => {
        if (!value) {
          return true;
        }
        const dispo_globale = parseInt(value);
        const dispo_departements = ctx.parent.dispo_departements.reduce(
          (acc, { dispo }) => {
            if (dispo !== null && !isNaN(dispo)) {
              return acc + parseInt(dispo);
            }
            return acc;
          },
          0
        );
        return dispo_globale >= dispo_departements;
      }
    ),
  email: yup.string().required(),
  geocode: yup
    .object()
    .required()
    .nullable()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  telephone: yup.string(),
  tis: yup.mixed().required(),
});

export { serviceSchema };
