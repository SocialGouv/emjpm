import yup from "./yup";

const mandataireSignupSchema = yup.object().shape({
  dispo_max: yup.number().required(),
  geocode: yup
    .object()
    .test("geocode", "Veuillez renseigner ce champ.", function (value) {
      return value.latitude && value.longitude && value.label;
    }),
  siret: yup
    .string()
    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
    .required(),
  telephone: yup.string().required(),
  telephone_portable: yup.string(),
  tis: yup.mixed().required(),
});

export { mandataireSignupSchema };
