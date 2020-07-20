import yup from "./yup";

const magistratMesureEditSchema = yup.object().shape({
  annee_naissance: yup.string().required(),
  cabinet: yup.string().nullable(),
  champ_mesure: yup.string().nullable(),
  civilite: yup.string().required(),
  nature_mesure: yup.string().required(),
  numero_rg: yup.string().required(),
});

export { magistratMesureEditSchema };
