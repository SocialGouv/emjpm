import yup from "./yup";

const individuelFormationSchema = yup.object().shape({
  cncDpfAnneeObtention: yup.number(),
  cncDpfHeureFormation: yup.number(),
  cncMajAnneeObtention: yup.number(),
  cncMajHeureFormation: yup.number(),
  cncMjpmAnneeObtention: yup.number().required(),
  cncMjpmHeureFormation: yup.number().required(),
  niveauQualification: yup
    .number()
    .required()
    .min(1)
    .max(5),
  niveauQualificationSecretaireSpe: yup
    .number()
    .required()
    .min(1)
    .max(5)
});

export { individuelFormationSchema };
