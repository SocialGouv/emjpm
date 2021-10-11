import { InlineError } from "~/components";

import { useEnqueteFieldShowError } from "./useEnqueteFieldShowError.hook";

export function EnqueteFormFieldErrorMessage({
  id,
  error,
  enqueteForm,
  disableErrorMessage,
  hideErrorMessageIfPristine,
}) {
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

  return (
    <div id={`msg-${id}`}>
      <InlineError showError={showError} message={error} fieldId={id} />
    </div>
  );
}
