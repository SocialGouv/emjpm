import * as Yup from "yup";

const magistratMesureEditSchema = Yup.object().shape({
  annee: Yup.string().required(),
  cabinet: Yup.string(),
  civilite: Yup.string().required(),
  numero_rg: Yup.string().required(),
  type: Yup.string().required()
});

export { magistratMesureEditSchema };
