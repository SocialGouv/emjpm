import yup from "./yup";

const individuelExerciceSchema = yup.object().shape({
  // anneeAgrement: yup.string().required(),
  // anneeDebutActivite: yup.number(),
  // debutActiviteAvant2009: yup.boolean().required()
});

export { individuelExerciceSchema };
