import { useMemo } from "react";

export function useAppFieldShowError({ id, error, formik, hideErrors }) {
  const { errors } = formik;

  if (!error) {
    error = errors[id];
  }

  const showError = useMemo(() => !hideErrors && !!error, [hideErrors, error]);

  return showError;
}
