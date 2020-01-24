import yup from "./yup";

const magistratMesureEditSchema = yup.object().shape({
  annee: yup.string().required(),
  cabinet: yup.string(),
  civilite: yup.string().required(),
  numero_rg: yup.string().required(),
  type: yup.string().required()
});

export { magistratMesureEditSchema };
