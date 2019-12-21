import * as Yup from "yup";

const serviceAcceptMesureSchema = Yup.object().shape({
  date_ouverture: Yup.date().required("Champ obligatoire"),
  geocode: Yup.object().required("Champ obligatoire"),
  residence: Yup.string().required("Champ obligatoire")
});

export { serviceAcceptMesureSchema };
