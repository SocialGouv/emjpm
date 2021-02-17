import { useMemo, useReducer, useState, useEffect, useRef } from "react";

const enqueteContextInitialValue = () => {
  return {
    actions: {
      autoSubmit: false,
    },
    form: {
      dirty: false,
      nextStep: null,
      submited: false,
      valid: true, // {section, step} | 'previous' | 'next'
    },
  };
};

function enqueteContextReducer(state, action) {
  switch (action.type) {
    case "submit-and-navigate": {
      const { nextStep } = action;
      if (!action.readOnly && state.form.dirty) {
        // form has been modified
        if (state.form.valid) {
          return {
            ...state,
            actions: {
              ...state.actions,
              autoSubmit: true,
            },
            form: {
              ...state.form,
              nextStep,
            },
          };
        } else {
          return {
            ...state,
            form: {
              ...state.form,
              nextStep,
              submited: true,
            },
          };
        }
      } else {
        return {
          ...state,
          form: {
            ...state.form,
            nextStep,
          },
        };
      }
    }
    case "navigate-to-next-page":
      return enqueteContextInitialValue;
    case "set-form-dirty":
      return {
        ...state,
        form: {
          ...state.form,
          dirty: action.value,
        },
      };
    case "set-form-valid":
      return {
        ...state,
        form: {
          ...state.form,
          valid: action.value,
        },
      };

    default:
      console.warn(`Unexpected state action ${action}`, state);
      throw new Error(`Unexpected state action ${action.type}`);
  }
}

export function useEnqueteContext(props) {
  const [openConfirmExitInvalidForm, setOpenConfirmExitInvalidForm] = useState(
    false
  );

  const { enqueteReponse, currentStep, navigateToStep, sections } = props;

  const { section, step } = useMemo(() => {
    const section = !sections ? undefined : sections[currentStep.step];
    const step = !section ? undefined : section.steps[currentStep.substep || 0];
    return { section, step };
  }, [currentStep.step, currentStep.substep, sections]);

  const enqueteReponseStatus = enqueteReponse ? enqueteReponse.status : "";
  const readOnly = enqueteReponseStatus !== "draft";

  const [enqueteContext, dispatchEnqueteContextEvent] = useReducer(
    enqueteContextReducer,
    enqueteContextInitialValue
  );

  const { nextStep, dirty, valid } = enqueteContext.form;
  const nextStepRef = useRef(nextStep);
  useEffect(() => {
    if (!nextStep || nextStepRef.current === nextStep) {
      return;
    }
    nextStepRef.current = nextStep;
    if (!readOnly && dirty) {
      if (!valid) {
        setOpenConfirmExitInvalidForm(true);
      }
    } else {
      navigateToStep(nextStep);
    }
  }, [
    nextStep,
    dirty,
    valid,
    readOnly,
    navigateToStep,
    setOpenConfirmExitInvalidForm,
  ]);

  async function saveAndNavigate({ step, substep }) {
    dispatchEnqueteContextEvent({
      type: "submit-and-navigate",
      value: { step, substep },
      readOnly,
      nextStep: { step, substep },
    });
  }

  return {
    confirmExitInvalidFormDialog: {
      onCancel: () => {
        setOpenConfirmExitInvalidForm(false);
      },
      onConfirm: () => {
        setOpenConfirmExitInvalidForm(false);
        dispatchEnqueteContextEvent({ type: "navigate-to-next-page" });
      },
      open: openConfirmExitInvalidForm,
    },
    dispatchEnqueteContextEvent,
    enqueteContext,
    saveAndNavigate,
    section,
    step,
  };
}
