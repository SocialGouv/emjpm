import yup from "./yup";

const editorTokenSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

export { editorTokenSchema };
