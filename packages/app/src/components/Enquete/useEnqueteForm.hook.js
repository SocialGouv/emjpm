import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
const emptyReferencedObject = {};
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
  // avoid infinite loop due to data = {} while data is loading in parent components
  data = useMemo(() => {
    // console.debug("[useEnqueteForm] input data changed", data);
    return data && !isEmptyObject(data) ? data : emptyReferencedObject;
  }, [data]);

  const initialValues = useMemo(() => {
    const initialValues = dataToForm ? dataToForm(data) : data;
    console.debug("[useEnqueteForm] build initialValues", data, initialValues);
    return initialValues;
  }, [data, dataToForm]);

  const formik = useFormik({
    initialValues,
    onChange: () => {},
    onSubmit: async (values, { setSubmitting }) => {
      values = formToData ? formToData(values) : values;
      await onSubmit(values);
      dispatchEnqueteContextEvent({ type: "navigate-to-next-page" });
      setSubmitting(false);
    },
    validationSchema,
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
        dirty: undefined,
        errors: undefined,
        handleBlur: undefined,
        handleChange: undefined,
        isValid: undefined,
        setFieldValue: undefined,
        setValues: undefined,
        submitForm: undefined,
        values: undefined,
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
      dirty ||
      (!loading &&
        !readOnly &&
        (step.status.indexOf("empty") !== 0 || enqueteContext.form.submited))
    );
  }, [dirty, step.status, readOnly, enqueteContext.form.submited, loading]);

  const submit = useCallback(
    ({ action }) => {
      if (action === "click-previous") {
        dispatchEnqueteContextEvent({
          type: "submit-and-navigate",
          value: "previous",
        });
      } else {
        dispatchEnqueteContextEvent({
          type: "submit-and-navigate",
          value: "next",
        });
      }
    },
    [dispatchEnqueteContextEvent]
  );

  return {
    enqueteContext,
    errors,
    formik,
    handleBlur,
    handleChange,
    readOnly,
    setFieldValue,
    setValues,
    showError,
    submit,
    submitForm,
    validationSchema,
    values,
  };
}
