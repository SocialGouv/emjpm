import { useMemo } from "react";

export function useAppFieldIsRequired({ id, required, validationSchema }) {
  return useMemo(() => {
    if (required) {
      return required;
    }
    if (!validationSchema) {
      return false;
    }
    const fieldValidation = validationSchema.fields[id];
    return (
      fieldValidation &&
      fieldValidation._exclusive &&
      fieldValidation._exclusive.required
    );
  }, [id, required, validationSchema]);
}
