import yup from "./yup";

const adminEditorSchema = yup.object().shape({
  name: yup.string().required(),
});

export { adminEditorSchema };
