import yup from "./yup";

const serviceAcceptMesureSchema = yup.object().shape({
  date_ouverture: yup.date().required(),
  geocode: yup
    .object()
    .nullable()
    .required(),
  residence: yup.string().required()
});

export { serviceAcceptMesureSchema };
