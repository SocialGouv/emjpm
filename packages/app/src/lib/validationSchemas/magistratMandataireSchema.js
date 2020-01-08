import * as Yup from "yup";

const magistratMandataireSchema = Yup.object().shape({
  annee: Yup.string().required(),
  cabinet: Yup.string(),
  civilite: Yup.string().required(),
  judgmentDate: Yup.date(),
  numero_rg: Yup.string().required(),
  type: Yup.string().required(),
  urgent: Yup.object().shape({
    label: Yup.string(),
    value: Yup.boolean()
  })
});

export { magistratMandataireSchema };
