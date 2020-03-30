import yup from "./yup";

const year = new Date().getFullYear();

const individuelFormationSchema = yup.object().shape({
  cncDpfAnneeObtention: yup
    .number()
    .min(1950)
    .max(year),
  cncDpfHeureFormation: yup.number().when("cncDpfAnneeObtention", {
    is: cncDpfAnneeObtention => cncDpfAnneeObtention,
    then: yup.number().required()
  }),
  cncMajAnneeObtention: yup
    .number()
    .min(1950)
    .max(year),
  cncMajHeureFormation: yup.number().when("cncMajAnneeObtention", {
    is: cncMajAnneeObtention => cncMajAnneeObtention,
    then: yup.number().required()
  }),
  cncMjpmAnneeObtention: yup
    .number()
    .required()
    .min(1950)
    .max(year),
  cncMjpmHeureFormation: yup.number().required(),
  niveauQualification: yup
    .number()
    .required()
    .min(1)
    .max(5),
  niveauQualificationSecretaireSpe: yup
    .number()
    .min(1)
    .max(5)
});

export { individuelFormationSchema };
