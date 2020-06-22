import { InlineError } from "@emjpm/ui";
import React from "react";

export const EnqueteInlineError = ({ id, error, enqueteForm, disableErrorMessage }) => {
  const { formik, showError } = enqueteForm;
  const { errors } = formik;

  if (!error) {
    error = errors[id];
  }

  return <InlineError showError={showError && !disableErrorMessage} message={error} fieldId={id} />;
};
