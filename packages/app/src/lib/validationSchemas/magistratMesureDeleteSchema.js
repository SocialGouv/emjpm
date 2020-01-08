import * as Yup from "yup";

const magistratMesureDeleteSchema = Yup.object().shape({
  reason_delete: Yup.string().required("Required")
});

export { magistratMesureDeleteSchema };
