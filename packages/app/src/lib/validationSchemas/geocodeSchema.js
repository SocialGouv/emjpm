import * as Yup from "yup";

const geocodeSchema = Yup.object().shape({
  city: Yup.string().required("Champ obligatoire"),
  label: Yup.string().required("Champ obligatoire"),
  lat: Yup.number().required("Champ obligatoire"),
  lng: Yup.number().required("Champ obligatoire"),
  postcode: Yup.number().required("Champ obligatoire")
});

export { geocodeSchema };
