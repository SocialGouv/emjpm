import yup from "./yup";

const individuelFormationSchema = yup.object().shape({
  // anneeAgrement: yup.string().required(),
  // anneeDebutActivite: yup.number(),
  // debutActiviteAvant2009: yup.boolean().required()
});

export { individuelFormationSchema };
