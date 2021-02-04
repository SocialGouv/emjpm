import yup from "./yup";

const magistratMandataireSchema = yup.object().shape({
  annee_naissance: yup.string().required(),
  cabinet: yup.string().nullable(),
  champ_mesure: yup.string().nullable(),
  civilite: yup.string().required(),
  judgmentDate: yup.date(),
  nature_mesure: yup.string().required(),
  numero_rg: yup.string().required(),
  urgent: yup.boolean().nullable(),
});

export { magistratMandataireSchema };
