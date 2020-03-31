import yup from "./yup";

const individuelExerciceSchema = yup.object().shape({
  cumulDelegueService: yup.object().required(),
  cumulDelegueServiceEtp: yup.object().when("cumulDelegueService", {
    is: cumulDelegueService => cumulDelegueService && cumulDelegueService.value,
    then: yup.object().required()
  }),
  cumulPrepose: yup.object().required(),
  cumulPreposeEtp: yup.object().when("cumulPrepose", {
    is: cumulPrepose => cumulPrepose && cumulPrepose.value,
    then: yup.object().required()
  }),
  estimationEtp: yup.object().shape({
    label: yup.string(),
    value: yup.string().required()
  }),
  secretariatSpecialise: yup.object().required(),
  secretariatSpecialiseEtp: yup.number().when("secretariatSpecialise", {
    is: secretariatSpecialise => secretariatSpecialise && secretariatSpecialise.value,
    then: yup.number().required()
  })
});

export { individuelExerciceSchema };
