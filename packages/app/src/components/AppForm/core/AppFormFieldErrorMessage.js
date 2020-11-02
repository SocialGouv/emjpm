import { InlineError } from "@emjpm/ui";
import React from "react";

import { useAppFieldShowError } from "./useAppFieldShowError.hook";

export const AppFormFieldErrorMessage = ({ id, error, formik, hideErrors }) => {
  const { errors } = formik;

  if (!error) {
    error = errors[id];
  }

  const showError = useAppFieldShowError({
    error,
    formik,
    hideErrors,
    id,
  });

  return <InlineError showError={showError} message={error} fieldId={id} />;
};
