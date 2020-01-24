import yup from "./yup";

const mandataireAcceptMesureSchema = yup.object().shape({
  date_ouverture: yup.date().required(),
  geocode: yup
    .object()
    .nullable()
    .required(),
  residence: yup.string().required()
});

export { mandataireAcceptMesureSchema };
