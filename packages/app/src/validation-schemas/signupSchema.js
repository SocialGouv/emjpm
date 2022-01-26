import yup from "./yup";

import { EMAIL_NOT_VALID } from "~/validation-schemas/yup";

const signupSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .required()
    .label("Confirmation du mot de passe")
    .oneOf([yup.ref("password"), null], "Les mots de passe ne sont pas égaux"),
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  nom: yup.string().required(),
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
  prenom: yup.string().required(),
  type: yup.string().required(),
  genre: yup.string().oneOf(["F", "H"]).required(),
});

export { signupSchema };
