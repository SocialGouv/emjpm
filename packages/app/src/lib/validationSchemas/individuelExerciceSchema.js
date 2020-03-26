import yup from "./yup";

const individuelExerciceSchema = yup.object().shape({
  cumulDelegueService: yup.object().required(),
  cumulDelegueServiceEtp: yup.object().when("cumulDelegueService", {
    is: cumulDelegueService => cumulDelegueService.value,
    then: yup.object().required()
  }),
  cumulPrepose: yup.object().required(),
  cumulPreposeEtp: yup.object().when("cumulPrepose", {
    is: cumulPrepose => cumulPrepose.value,
    then: yup.object().required()
  }),
  estimationEtp: yup.object().shape({
    label: yup.string(),
    value: yup.string().required()
  }),
  secretaireSpecialise: yup.object().required(),
  secretaireSpecialiseEtp: yup.object().when("secretaireSpecialise", {
    is: secretaireSpecialise => secretaireSpecialise.value,
    then: yup.object().required()
  })
});

export { individuelExerciceSchema };
