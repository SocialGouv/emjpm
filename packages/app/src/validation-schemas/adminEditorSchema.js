import yup, { URL_NOT_VALID } from "./yup";

const adminEditorSchema = yup.object().shape({
  name: yup
    .string()
    .required(
      "Veillez saisir un nom d'éditeur valide. Par exemple: World's best software company."
    ),
  redirect_uris: yup
    .array()
    .transform(function (value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value;
      }
      return originalValue ? originalValue.split(/[\s,]+/) : [];
    })
    .of(
      yup
        .string()
        .matches(
          /^(?:([a-z0-9+.-]+):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/,
          URL_NOT_VALID
        )
    )
    .required(URL_NOT_VALID),
});

export { adminEditorSchema };
