import { authenticator } from "otplib";

import yup, {
  EMAIL_NOT_VALID,
  NOM_NOT_VALID,
  PRENOM_NOT_VALID,
  QRCODE_TOKEN_FORMAT,
  QRCODE_TOKEN_INVALID,
} from "./yup";

const adminEditSchema = yup.object().shape({
  email: yup.string().email().required(EMAIL_NOT_VALID),
  nom: yup.string().required(NOM_NOT_VALID),
  prenom: yup.string().required(PRENOM_NOT_VALID),
  secret_2fa: yup.string().nullable(),
  code_2fa: yup
    .string()
    .when("secret_2fa", {
      is: (secret) => !!secret,
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
        .test(
          "qr-invalid",
          QRCODE_TOKEN_INVALID,
          (token, { parent: { secret_2fa: secret } }) => {
            if (!token || token.toString().length !== 6) {
              return true;
            }
            let isValid;
            try {
              isValid = authenticator.verify({ token, secret });
            } catch (err) {
              console.error(err);
            }
            return isValid;
          }
        )
        .required()
        .nullable(),
    })
    .nullable(),
});

export { adminEditSchema };
