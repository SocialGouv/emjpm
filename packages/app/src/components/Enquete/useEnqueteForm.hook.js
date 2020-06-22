import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";

export function useEnqueteForm({
  onSubmit,
  dispatchEnqueteContextEvent,
  data,
  enqueteContext,
  step,
  validationSchema,
  dataToForm,
  formToData,
  loading,
}) {
  useMemo(() => console.debug("[useEnqueteForm] input data changed", data), [data]);

  const initialValues = dataToForm ? dataToForm(data) : data;
  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      values = formToData ? formToData(values) : values;
      await onSubmit(values);
      dispatchEnqueteContextEvent({ type: "navigate-to-next-page" });
      setSubmitting(false);
    },
    validationSchema,
    initialValues,
    onChange: () => {},
  });

  const {
    submitForm,
    handleChange,
    handleBlur,
    values,
    errors,
    setValues,
    setFieldValue,
    isValid,
    dirty,
  } = formik
    ? formik
    : {
        submitForm: undefined,
        handleChange: undefined,
        handleBlur: undefined,
        values: undefined,
        errors: undefined,
        setValues: undefined,
        setFieldValue: undefined,
        isValid: undefined,
        dirty: undefined,
      };

  const enqueteReponseStatus = enqueteContext.enqueteReponse.status;
  const readOnly = enqueteReponseStatus !== "draft";

  useEffect(() => {
    setTimeout(() => {
      // console.log("set-form-valid");
      dispatchEnqueteContextEvent({ type: "set-form-valid", value: isValid });
    }, 0);
  }, [dispatchEnqueteContextEvent, isValid]);

  useEffect(() => {
    setTimeout(() => {
      // console.log("set-form-dirty");
      dispatchEnqueteContextEvent({ type: "set-form-dirty", value: dirty });
    }, 0);
  }, [dispatchEnqueteContextEvent, dirty]);

  useEffect(() => {
    if (enqueteContext.actions.autoSubmit === true) {
      setTimeout(() => {
        submitForm();
      }, 0);
    }
  }, [enqueteContext.actions.autoSubmit, submitForm]);

  useEffect(() => {
    const newValues = dataToForm ? dataToForm(data) : data;
    setValues(newValues);
  }, [data, dataToForm, setValues]);

  const showError = useMemo(() => {
    return (
      dirty || (!loading && !readOnly && (step.status !== "empty" || enqueteContext.form.submited))
    );
  }, [dirty, step.status, readOnly, enqueteContext.form.submited, loading]);

  const submit = useCallback(
    ({ action }) => {
      if (action === "click-previous") {
        dispatchEnqueteContextEvent({ type: "submit-and-navigate", value: "previous" });
      } else {
        dispatchEnqueteContextEvent({ type: "submit-and-navigate", value: "next" });
      }
    },
    [dispatchEnqueteContextEvent]
  );

  return {
    formik,
    enqueteContext,
    validationSchema,
    submitForm,
    handleChange,
    handleBlur,
    values,
    errors,
    setValues,
    setFieldValue,
    showError,
    submit,
    readOnly,
  };
}
