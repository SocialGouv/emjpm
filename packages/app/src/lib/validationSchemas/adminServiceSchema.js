import * as Yup from "yup";

const adminServiceSchema = Yup.object().shape({
  email: Yup.string().email("Le format de votre email n'est pas correct"),
  etablissement: Yup.string().required("Champ obligatoire"),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  telephone: Yup.string()
});

export { adminServiceSchema };
