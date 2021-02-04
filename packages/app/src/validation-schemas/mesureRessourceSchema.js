import yup from "./yup";

const currentYear = new Date().getFullYear();

const mesureRessourceSchema = yup.object().shape({
  annee: yup
    .number()
    .nullable()
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(currentYear, "l'année choisi doit être au maximum " + currentYear),
  niveau_ressource: yup.number().required(),
  prestations_sociales: yup
    .string()
    .ensure()
    .required("Sélectionnez au moins une prestation sociale"),
});

export { mesureRessourceSchema };
