import yup from "./yup";

const signupSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .required()
    .label("Confirmation du mot de passe")
    .oneOf([yup.ref("password"), null], "Les mots de passe ne sont pas égaux"),
  email: yup
    .string()
    .email("Le format de votre email n'est pas correct")
    .required(),
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
});

export { signupSchema };
