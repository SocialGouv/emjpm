import * as Yup from "yup";

const mandataireAcceptMesureSchema = Yup.object().shape({
  date_ouverture: Yup.date().required("Champ obligatoire"),
  geocode: Yup.object().required("Champ obligatoire"),
  residence: Yup.string().required("Champ obligatoire")
});

export { mandataireAcceptMesureSchema };
