import React from "react";

import { InlineError } from "~/ui";

import { useEnqueteFieldShowError } from "./useEnqueteFieldShowError.hook";

export const EnqueteFormFieldErrorMessage = ({
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
    disableErrorMessage,
    enqueteForm,
    error,
    hideErrorMessageIfPristine,
    id,
  });

  return <InlineError showError={showError} message={error} fieldId={id} />;
};
