import yup, { EMAIL_NOT_VALID, QRCODE_TOKEN_FORMAT } from "./yup";

const loginSchema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  code_2fa: yup
    .string()
    .when("authEnabled2FA", {
      is: (enabled) => enabled,
      then: yup
        .string()
        .test("qr-format", QRCODE_TOKEN_FORMAT, (val) => {
          if (!val) {
            return;
          }
          if (val.toString().length !== 6) {
            return false;
          }
          return /^\d+$/.test(val);
        })
        .required()
        .nullable(),
    })
    .nullable(),
});

export { loginSchema };
