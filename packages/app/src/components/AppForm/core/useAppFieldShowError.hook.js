export function useAppFieldShowError({
  id,
  error,
  formik,
  hideErrors = false,
  displayOnlyWhenTouched = true,
}) {
  const { errors } = formik;

  if (!error) {
    error = errors[id];
  }

  const showError =
    !hideErrors && // disabled by component
    !!error && // no error to display
    (!displayOnlyWhenTouched || !!formik.touched[id]); // not touched by user

  return showError;
}
