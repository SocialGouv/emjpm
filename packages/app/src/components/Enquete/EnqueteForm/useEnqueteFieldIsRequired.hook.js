import { useMemo } from "react";

export function useEnqueteFieldIsRequired({ id, enqueteForm }) {
  const validationSchema = { enqueteForm };
  return useMemo(() => {
    const fieldValidation = validationSchema.fields[id];
    return fieldValidation && fieldValidation._exclusive && fieldValidation._exclusive.required;
  }, [id, validationSchema.fields]);
}
