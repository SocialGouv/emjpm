import yup from "./yup";

const individuelExerciceSchema = yup.object().shape({
  cumulDelegueService: yup.object().shape({
    label: yup.string().required(),
    value: yup.boolean().required()
  }),
  cumulDelegueServiceEtp: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  }),
  cumulPrepose: yup.object().shape({
    label: yup.string().required(),
    value: yup.boolean().required()
  }),
  cumulPreposeEtp: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  }),
  estimationEtp: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  }),
  secretaireSpecialise: yup.object().shape({
    label: yup.string().required(),
    value: yup.boolean().required()
  }),
  secretaireSpecialiseEtp: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  })
});

export { individuelExerciceSchema };
