import { useFormik } from "formik";
import { useEffect, useMemo } from "react";

export function useEnqueteForm({
  onSubmit,
  dispatchEnqueteContextEvent,
  data,
  enqueteContext,
  step,
  validationSchema,
  mapDataPropsToFormValues
}) {
  const {
    submitForm,
    submitCount,
    handleChange,
    values,
    errors,
    setValues,
    setFieldValue,
    isValid,
    dirty
  } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await onSubmit(values);
      dispatchEnqueteContextEvent({ type: "navigate-to-next-page" });
      setSubmitting(false);
    },
    validationSchema,
    initialValues: mapDataPropsToFormValues(data),
    onChange: () => {}
  });

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
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues, mapDataPropsToFormValues]);

  const showError = useMemo(() => step.status !== "empty" || submitCount !== 0, [
    step.status,
    submitCount
  ]);

  const submit = useMemo(
    () => ({ action }) => {
      if (action === "click-previous") {
        dispatchEnqueteContextEvent({ type: "set-next-step", value: "previous" });
      } else {
        dispatchEnqueteContextEvent({ type: "set-next-step", value: "next" });
      }
      submitForm();
    },
    [submitForm, dispatchEnqueteContextEvent]
  );

  return {
    submitForm,
    submitCount,
    handleChange,
    values,
    errors,
    setValues,
    setFieldValue,
    showError,
    submit
  };
}
