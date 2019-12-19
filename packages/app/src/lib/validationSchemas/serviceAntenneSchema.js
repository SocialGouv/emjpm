import * as Yup from "yup";

const serviceAntenneSchema = Yup.object().shape({
  contact_email: Yup.string().required("Champ obligatoire"),
  contact_firstname: Yup.string().required("Champ obligatoire"),
  contact_lastname: Yup.string().required("Champ obligatoire"),
  contact_phone: Yup.string().required("Champ obligatoire"),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  mesures_max: Yup.number().required("Champ obligatoire"),
  name: Yup.string().required("Champ obligatoire")
});

export { serviceAntenneSchema };
