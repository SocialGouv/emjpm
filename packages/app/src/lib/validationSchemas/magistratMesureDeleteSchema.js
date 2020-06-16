import yup from "./yup";

const magistratMesureDeleteSchema = yup.object().shape({
  reason_delete: yup.string().required(),
});

export { magistratMesureDeleteSchema };
