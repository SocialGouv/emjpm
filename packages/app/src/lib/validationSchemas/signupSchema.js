import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required()
    .label("Confirmation du mot de passe")
    .test("passwords-match", "Les mots de passe ne sont pas égaux", function(value) {
      return this.parent.password === value;
    }),
  email: Yup.string()
    .email("Le format de votre email n'est pas correct")
    .required("Champ obligatoire"),
  nom: Yup.string().required("Champ obligatoire"),
  password: Yup.string()
    .label("Mot de passe")
    .required()
    .min(8, "Votre mot de passe doit être de 8 caractères minimum")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
      {
        message: "Votre mot de passe doit contenir au moins 1 chiffre et un caractère spéciale"
      }
    ),
  prenom: Yup.string().required("Champ obligatoire"),
  type: Yup.string().required("Champ obligatoire")
});

export { signupSchema };
