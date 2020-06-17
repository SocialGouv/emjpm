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
    submitCount,
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
        submitCount: undefined,
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
  useMemo(() => {
    setTimeout(() => {
      dispatchEnqueteContextEvent({ type: "set-form-valid", value: isValid });
    }, 0);
  }, [dispatchEnqueteContextEvent, isValid]);
  useMemo(() => {
    setTimeout(() => {
      dispatchEnqueteContextEvent({ type: "set-form-dirty", value: dirty });
    }, 0);
  }, [dispatchEnqueteContextEvent, dirty]);
  useMemo(() => {
    setTimeout(() => {
      dispatchEnqueteContextEvent({ type: "set-form-value", value: values });
    }, 0);
  }, [dispatchEnqueteContextEvent, values]);
  useMemo(() => {
    setTimeout(() => {
      dispatchEnqueteContextEvent({ type: "set-form-value", value: values });
    }, 0);
  }, [dispatchEnqueteContextEvent, values]);
  useMemo(() => {
    if (enqueteContext.actions.autoSubmit === true) {
      setTimeout(() => {
        submitForm();
      }, 0);
    }
  }, [enqueteContext.actions.autoSubmit, submitForm]);

  useEffect(() => {
    setValues(dataToForm(data));
  }, [data, setValues, dataToForm]);

  const showError = useMemo(() => !loading && (step.status !== "empty" || submitCount !== 0), [
    step.status,
    submitCount,
    loading,
  ]);

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
    submitForm,
    submitCount,
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
