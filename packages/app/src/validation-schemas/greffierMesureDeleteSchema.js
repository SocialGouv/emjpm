import yup from "./yup";

const greffierMesureDeleteSchema = yup.object().shape({
  reason_delete: yup.string().required(),
});

export { greffierMesureDeleteSchema };
