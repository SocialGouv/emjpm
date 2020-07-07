import yup from "./yup";

const magistratMandataireSchema = yup.object().shape({
  annee_naissance: yup.string().required(),
  cabinet: yup.string().nullable(),
  civilite: yup.string().required(),
  judgmentDate: yup.date(),
  numero_rg: yup.string().required(),
  type: yup.string().required(),
  urgent: yup.object().shape({
    label: yup.string(),
    value: yup.boolean(),
  }),
});

export { magistratMandataireSchema };
