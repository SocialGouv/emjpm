import yup, { URL_NOT_VALID } from "./yup";

const adminEditorSchema = yup.object().shape({
  name: yup
    .string()
    .required(
      "Veillez saisir un nom d'éditeur valide. Par exemple: World's best software company."
    ),
  redirect_uris: yup.string().url(URL_NOT_VALID).required(),
});

export { adminEditorSchema };
