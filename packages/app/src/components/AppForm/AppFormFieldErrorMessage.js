import { InlineError } from "~/components";

import useAppFieldShowError from "./useAppFieldShowError";

export default function AppFormFieldErrorMessage({
  id,
  error,
  formik,
  hideErrors,
}) {
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
}
