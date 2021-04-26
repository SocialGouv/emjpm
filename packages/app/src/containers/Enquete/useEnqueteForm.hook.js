import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import useUser from "~/hooks/useUser";

function getNextPageStep(sections, currentStep) {
  const { step, substep } = currentStep;
  const currentSection =
    sections && sections.length > step ? sections[step] : undefined;
  if (currentSection) {
    if (
      currentSection.steps.length <= 1 ||
      substep + 1 === currentSection.steps.length
    ) {
      return { step: step + 1, substep: 0 };
    } else {
      return { step, substep: substep + 1 };
    }
  }
}

function getPrevPageStep(sections, currentStep) {
  const { step, substep } = currentStep;
  if (substep > 0) {
    return { step, substep: substep - 1 };
  } else if (currentStep.step - 1 >= 0) {
    const substep = sections[currentStep.step - 1].steps.length;
    return { step: currentStep.step - 1, substep: substep - 1 };
  }
}

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
  sections,
  currentStep,
}) {
  const initialValues = useMemo(() => {
    const initialValues = dataToForm ? dataToForm(data) : data;
    // console.debug("[useEnqueteForm] build initialValues", data, initialValues);
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

  const { type: userType } = useUser();
  let readOnly;
  switch (userType) {
    case "direction":
      switch (enqueteReponseStatus) {
        case "draft":
        case "submitted":
        case "validated":
        default:
          readOnly = false;
          break;
      }
      break;
    case "mandataire":
    case "prepose":
    case "individuel":
    default:
      switch (enqueteReponseStatus) {
        case "draft":
          readOnly = false;
          break;
        default:
        case "submitted":
          readOnly = true;
          break;
      }
      break;
  }

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
          nextStep: getPrevPageStep(sections, currentStep),
          readOnly,
        });
      } else {
        // "click-next"
        dispatchEnqueteContextEvent({
          type: "submit-and-navigate",
          value: "next",
          nextStep: getNextPageStep(sections, currentStep),
          readOnly,
        });
      }
    },
    [dispatchEnqueteContextEvent, readOnly, currentStep, sections]
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
