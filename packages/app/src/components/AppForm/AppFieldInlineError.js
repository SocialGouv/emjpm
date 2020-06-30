import { InlineError } from "@emjpm/ui";
import React from "react";

import { useAppFieldShowError } from "./useAppFieldShowError.hook";

export const AppFieldInlineError = ({ id, error, formik, hideErrors }) => {
  const { errors } = formik;

  if (!error) {
    error = errors[id];
  }

  const showError = useAppFieldShowError({
    id,
    error,
    formik,
    hideErrors,
  });

  return <InlineError showError={showError} message={error} fieldId={id} />;
};
