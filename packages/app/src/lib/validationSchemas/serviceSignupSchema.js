import * as Yup from "yup";

const serviceSignupSchema = Yup.object().shape({
  departement: Yup.mixed().required("Champ obligatoire"),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  service: Yup.mixed().required("Champ obligatoire")
});

export { serviceSignupSchema };
