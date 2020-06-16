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
  const memoizedData = useMemo(
    () => data,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    !data ? [] : Object.values(data) // if data reference changes, but not values, keep the same reference
  );

  const initialValues = dataToForm ? dataToForm(memoizedData) : memoizedData;
  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      console.log("xxx submit values:", values);
      values = formToData ? formToData(values) : values;
      console.log("xxx submit values transformed:", values);
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
    setValues(dataToForm(memoizedData));
  }, [memoizedData, setValues, dataToForm]);

  const showError = useMemo(() => !loading && (step.status !== "empty" || submitCount !== 0), [
    step.status,
    submitCount,
    loading,
  ]);

  const submit = useCallback(
    () => ({ action }) => {
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
  };
}
