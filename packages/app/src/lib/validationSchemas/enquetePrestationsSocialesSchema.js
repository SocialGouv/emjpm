import yup from "./yup";

export const enquetePrestationsSocialesSchema = yup.object().shape({
  aah: yup
    .number()
    .min(0)
    .nullable(),
  als_apl: yup
    .number()
    .min(0)
    .nullable(),
  apa: yup
    .number()
    .min(0)
    .nullable(),
  asi: yup
    .number()
    .min(0)
    .nullable(),
  aspa: yup
    .number()
    .min(0)
    .nullable(),
  pch: yup
    .number()
    .min(0)
    .nullable(),
  rsa: yup
    .number()
    .min(0)
    .nullable()
});

export default enquetePrestationsSocialesSchema;
