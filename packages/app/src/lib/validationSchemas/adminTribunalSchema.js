import * as Yup from "yup";

const adminTribunalSchema = Yup.object().shape({
  email: Yup.string().email("Le format de votre email n'est pas correct"),
  etablissement: Yup.string().required("Champ obligatoire"),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  siret: Yup.string().required("Champ obligatoire"),
  telephone: Yup.string()
});

export { adminTribunalSchema };
