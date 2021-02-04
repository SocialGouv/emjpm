import yup from "./yup";

const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Votre mot de passe doit être de 8 caractères minimum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
      "Votre mot de passe doit contenir au moins 1 chiffre et un caractère spécial"
    )
    .required(),
  newPasswordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "Les mots de passe ne sont pas égaux"
    )
    .required(),
  password: yup.string().required(),
});

export { passwordSchema };
