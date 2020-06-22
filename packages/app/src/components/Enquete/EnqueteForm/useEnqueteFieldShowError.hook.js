import { useMemo } from "react";

import { FORM_REQUIRED_MESSAGE } from "../../../lib/validationSchemas/yup";

export function useEnqueteFieldShowError({
  id,
  error,
  enqueteForm,
  disableErrorMessage,
  hideErrorMessageIfPristine,
}) {
  const { enqueteContext, showError: showFormErrors, formik } = enqueteForm;

  const { errors } = formik;

  if (!error) {
    error = errors[id];
  }

  hideErrorMessageIfPristine = useMemo(
    () => (!hideErrorMessageIfPristine ? error === FORM_REQUIRED_MESSAGE : false),
    [error, hideErrorMessageIfPristine]
  );

  const showError = useMemo(() => {
    const hasError = showFormErrors && !!error && !disableErrorMessage;
    if (hasError) {
      return (
        !hideErrorMessageIfPristine ||
        enqueteContext.form.submited ||
        enqueteContext.step.status !== "empty"
      );
    }
    return false;
  }, [
    showFormErrors,
    error,
    disableErrorMessage,
    hideErrorMessageIfPristine,
    enqueteContext.form.submited,
    enqueteContext.step.status,
  ]);

  return showError;
}
