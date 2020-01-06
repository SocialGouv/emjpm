import * as Yup from "yup";

const passwordSchema = Yup.object().shape({
  newPassword: Yup.string("Champ obligatoire")
    .min(8, "Votre mot de passe doit être de 8 caractères minimum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
      "Votre mot de passe doit contenir au moins 1 chiffre et un caractère spécial"
    )
    .required("Champ obligatoire"),
  newPasswordConfirmation: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Les mots de passe ne sont pas égaux")
    .required("Champ obligatoire"),
  password: Yup.string().required("Champ obligatoire")
});

export { passwordSchema };
