import yup from "./yup";

const individuelAgrementSchema = yup.object().shape({
  anneeAgrement: yup.string().required(),
  anneeDebutActivite: yup.number(),
  debutActiviteAvant2009: yup.boolean().required()
});

export { individuelAgrementSchema };
