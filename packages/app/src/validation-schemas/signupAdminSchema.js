import { authenticator } from "otplib";
import yup from "./yup";

import {
  EMAIL_NOT_VALID,
  PRENOM_NOT_VALID,
  NOM_NOT_VALID,
  QRCODE_TOKEN_FORMAT,
  QRCODE_TOKEN_INVALID,
} from "~/validation-schemas/yup";

const signupAdminSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .required()
    .label("Confirmation du mot de passe")
    .oneOf([yup.ref("password"), null], "Les mots de passe ne sont pas égaux"),
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  nom: yup.string().required(NOM_NOT_VALID),
  password: yup
    .string()
    .label("Mot de passe")
    .required()
    .min(8, "Votre mot de passe doit être de 8 caractères minimum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
      {
        message:
          "Votre mot de passe doit contenir au moins 1 chiffre et un caractère spéciale",
      }
    ),
  prenom: yup.string().required(PRENOM_NOT_VALID),
  secret_2fa: yup.string().required(),
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

export { signupAdminSchema };
