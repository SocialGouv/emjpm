import yup from "./yup";

const mandataireAgrementSchema = yup.object().shape({
  anneeAgrement: yup.string().required(),
  anneeDebutActivite: yup.number(),
  debutAactiviteAvant2009: yup.boolean().required(),
  departementFinanceur: yup.string().required(),
  departementsAgrement: yup.string().required()
});

export { mandataireAgrementSchema };
