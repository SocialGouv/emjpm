import yup, { NIVEAU_DE_RESSOURCE_NOT_VALID } from "./yup";

const currentYear = new Date().getFullYear();

const mesureRessourceSchema = yup.object().shape({
  annee: yup
    .number()
    .typeError(
      `L'année choisie doit être au minimum 1900. Par exemple  : ${
        Number(currentYear) - 1
      }.`
    )
    .required(
      `L'année choisie doit être au minimum 1900. Par exemple : ${
        Number(currentYear) - 1
      }.`
    )
    .min(
      1900,
      `L'année choisie doit être au minimum 1900. Par exemple : ${
        Number(currentYear) - 1
      }.`
    )
    .max(
      currentYear,
      `L'année choisie doit être au maximum  ${currentYear}. Par exemple : ${
        Number(currentYear) - 1
      }.`
    ),
  niveau_ressource: yup
    .number(NIVEAU_DE_RESSOURCE_NOT_VALID)
    .typeError(NIVEAU_DE_RESSOURCE_NOT_VALID)
    .required(NIVEAU_DE_RESSOURCE_NOT_VALID),
  prestations_sociales: yup
    .array()
    .of(yup.string())
    .ensure()
    .required("Sélectionnez au moins une prestation sociale"),
});

export { mesureRessourceSchema };
