import yup from "./yup";

const year = new Date().getFullYear();

export const mandataireEnqueteIndividuelSchema = yup.object().shape({
  anneeAgrement: yup
    .number()
    .nullable()
    .min(2010),
  anneeDebutActivite: yup.number().when("debutActiviteAvant2009", {
    is: debutActiviteAvant2009 => debutActiviteAvant2009 && debutActiviteAvant2009.value,
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
  cumulDelegueService: yup.boolean().required(),
  cumulDelegueServiceEtp: yup.object().when("cumulDelegueService", {
    is: cumulDelegueService => cumulDelegueService && cumulDelegueService.value,
    then: yup.object().required()
  }),
  cumulPrepose: yup.boolean().required(),
  cumulPreposeEtp: yup.object().when("cumulPrepose", {
    is: cumulPrepose => cumulPrepose && cumulPrepose.value,
    then: yup.object().required()
  }),
  debutActiviteAvant2009: yup.boolean().required(),
  estimationEtp: yup.string().required(),
  niveauQualification: yup
    .number()
    .min(1)
    .max(5),
  niveauQualificationSecretaireSpe: yup
    .number()
    .min(1)
    .max(5),
  secretaireSpecialise: yup.boolean().required(),
  secretaireSpecialiseEtp: yup.string().when("secretaireSpecialise", {
    is: secretariatSpecialise => secretariatSpecialise === true,
    then: yup.string().required()
  })
});
