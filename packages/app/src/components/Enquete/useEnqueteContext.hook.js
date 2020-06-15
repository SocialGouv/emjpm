import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { useMemo, useReducer, useState } from "react";

export const useEnqueteContext = props => {
  const [openConfirmExitInvalidForm, setOpenConfirmExitInvalidForm] = useState(false);

  const { currentStep, navigateToStep, sections } = props;

  const enqueteContextInitialValue = useMemo(
    () => ({
      form: {
        dirty: false,
        valid: true,
        value: undefined,
        nextStep: getNextPageStep(sections, currentStep) // {section, step} | 'previous' | 'next'
      },
      actions: {
        autoSubmit: false
      }
    }),
    [currentStep, sections]
  );
  function enqueteContextReducer(state, action) {
    switch (action.type) {
      case "set-next-step": {
        const nextStep =
          !action.value || action.value === "next"
            ? getNextPageStep(sections, currentStep)
            : action.value === "previous"
            ? getPrevPageStep(sections, currentStep)
            : action.value;
        return {
          ...state,
          form: {
            ...state.form,
            nextStep
          }
        };
      }
      case "navigate-to-next-page":
        navigateToStep(state.form.nextStep);
        // reset state
        return enqueteContextInitialValue;
      case "set-form-dirty":
        return {
          ...state,
          form: {
            ...state.form,
            dirty: action.value
          }
        };
      case "set-form-valid":
        return {
          ...state,
          form: {
            ...state.form,
            valid: action.value
          }
        };
      case "set-form-value":
        return {
          ...state,
          form: {
            ...state.form,
            value: action.value
          }
        };
      case "set-actions-autoSubmit":
        return {
          ...state,
          actions: {
            ...state.form,
            autoSubmit: true
          }
        };
      default:
        console.warn(`Unexpected state action ${action}`, state);
        throw new Error(`Unexpected state actio ${action.type}`);
    }
  }
  const [enqueteContext, dispatchEnqueteContextEvent] = useReducer(
    enqueteContextReducer,
    enqueteContextInitialValue
  );

  return {
    enqueteContext,
    dispatchEnqueteContextEvent,
    saveAndNavigate,
    confirmExitInvalidFormDialog: {
      open: openConfirmExitInvalidForm,
      onConfirm: () => {
        setOpenConfirmExitInvalidForm(false);
        dispatchEnqueteContextEvent({ type: "navigate-to-next-page" });
      },
      onCancel: () => {
        setOpenConfirmExitInvalidForm(false);
      }
    }
  };

  async function saveAndNavigate({ step, substep }) {
    dispatchEnqueteContextEvent({ type: "set-next-step", value: { step, substep } });
    let navigationConfirmed = true;
    if (enqueteContext.form.dirty) {
      if (enqueteContext.form.valid) {
        dispatchEnqueteContextEvent({ type: "set-actions-autoSubmit", value: true });
        navigationConfirmed = false;
      } else {
        setOpenConfirmExitInvalidForm(true);
        navigationConfirmed = false;
      }
    }
    if (navigationConfirmed) {
      dispatchEnqueteContextEvent({ type: "navigate-to-next-page" });
    }
  }

  function getNextPageStep(sections, currentStep) {
    const { step, substep } = currentStep;
    const currentSection = sections && sections.length > step ? sections[step] : undefined;

    if (currentSection) {
      if (currentSection.steps.length <= 1 || substep + 1 === currentSection.steps.length) {
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
};
