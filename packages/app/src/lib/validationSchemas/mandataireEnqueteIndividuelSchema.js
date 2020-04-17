import yup from "./yup";

const year = new Date().getFullYear();

export const mandataireEnqueteIndividuelSchema = yup.object().shape({
  anneeAgrement: yup
    .number()
    .nullable()
    .min(2010),
  anneeDebutActivite: yup.number().when("debutActiviteAvant2009", {
    is: debutActiviteAvant2009 => debutActiviteAvant2009 === true,
    then: yup
      .number()
      .required()
      .min(1950)
      .max(year)
  }),
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
    .nullable()
    .min(1950)
    .max(year),
  cncMjpmHeureFormation: yup.number().nullable(),
  cumulDelegueService: yup.boolean(),
  cumulDelegueServiceEtp: yup.string().when("cumulDelegueService", {
    is: cumulDelegueService => cumulDelegueService === true,
    then: yup.string().required()
  }),
  cumulPrepose: yup.boolean(),
  cumulPreposeEtp: yup.string().when("cumulPrepose", {
    is: cumulPrepose => cumulPrepose === true,
    then: yup.string().required()
  }),
  debutActiviteAvant2009: yup.boolean(),
  estimationEtp: yup.string().required(),
  niveauQualification: yup
    .number()
    .min(1)
    .max(5),
  niveauQualificationSecretaireSpe: yup
    .number()
    .min(1)
    .max(5),
  secretaireSpecialise: yup.boolean(),
  secretaireSpecialiseEtp: yup.string().when("secretaireSpecialise", {
    is: secretariatSpecialise => secretariatSpecialise === true,
    then: yup.string().required()
  })
});
