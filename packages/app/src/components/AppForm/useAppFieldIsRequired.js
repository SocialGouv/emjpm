import { useMemo } from "react";

function isFieldRequired(validationSchema, id) {
  return (
    validationSchema
      .describe()
      .fields[id]?.tests.findIndex(({ name }) => name === "required") >= 0
  );
}

export default function useAppFieldIsRequired({
  id,
  required,
  validationSchema,
}) {
  return useMemo(() => {
    if (required) {
      return required;
    }
    if (!validationSchema) {
      return false;
    }
    return isFieldRequired(validationSchema, id);
  }, [id, required, validationSchema]);
}
