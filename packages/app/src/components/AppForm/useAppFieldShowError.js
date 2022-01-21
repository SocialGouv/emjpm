export default function useAppFieldShowError({
  id,
  error,
  formik,
  hideErrors = false,
  displayOnlyWhenTouched = true,
}) {
  const { errors, submitCount } = formik;

  if (!error) {
    error = errors[id];
  }

  const showError =
    !hideErrors && // disabled by component
    !!error && // no error to display
    (!displayOnlyWhenTouched || !!formik.touched[id] || submitCount > 0); // not touched by user

  return showError;
}
