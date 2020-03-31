import yup from "./yup";

const year = new Date().getFullYear();

const individuelAgrementSchema = yup.object().shape({
  anneeAgrement: yup
    .number()
    .required()
    .min(2010),
  anneeDebutActivite: yup.number().when("debutActiviteAvant2009", {
    is: debutActiviteAvant2009 => debutActiviteAvant2009.value,
    then: yup
      .number()
      .required()
      .min(1950)
      .max(year)
  }),
  debutActiviteAvant2009: yup.object().shape({
    label: yup.string().required(),
    value: yup.boolean().required()
  })
  // departementPayeur: yup
  //   .object()
  //   .shape({
  //     label: yup.string(),
  //     value: yup.number()
  //   })
  //   .required()
});

export { individuelAgrementSchema };
