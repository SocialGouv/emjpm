import { InlineError } from "@emjpm/ui";
import React from "react";

import { useEnqueteFieldShowError } from "./useEnqueteFieldShowError.hook";

export const EnqueteFieldInlineError = ({
  id,
  error,
  enqueteForm,
  disableErrorMessage,
  hideErrorMessageIfPristine,
}) => {
  const { formik } = enqueteForm;
  const { errors } = formik;

  if (!error) {
    error = errors[id];
  }

  const showError = useEnqueteFieldShowError({
    id,
    error,
    enqueteForm,
    disableErrorMessage,
    hideErrorMessageIfPristine,
  });

  return <InlineError showError={showError} message={error} fieldId={id} />;
};
