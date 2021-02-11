import { useReducer, useMemo, useCallback, useRef } from "react";
import { Error } from "@styled-icons/material/Error";
import Loader from "~/components/Loader";

import { captureException } from "~/user/sentry";

import GlobalLoaderContext from "./context";
import styles from "./style";

const initialState = {
  waiting: 0,
  isLoading: false,
  hasError: false,
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "hasError":
      return { ...state, hasError: payload.hasError };
    case "wait": {
      const waiting = state.waiting + 1;
      return { ...state, waiting, isLoading: waiting > 0 };
    }
    case "done": {
      const waiting = state.waiting - 1;
      return { ...state, waiting, isLoading: waiting > 0 };
    }
  }
};

export default function GlobalLoader(props) {
  const { current: errorsSet } = useRef(new Set());

  const [state, dispatch] = useReducer(reducer, initialState);

  const wait = useCallback(() => {
    dispatch({ type: "wait" });
  }, [dispatch]);
  const done = useCallback(() => {
    dispatch({ type: "done" });
  }, [dispatch]);

  const addError = useCallback(
    (error) => {
      if (errorsSet.has(error)) {
        return;
      }
      console.error(error);
      captureException(error);
      errorsSet.add(error);
      dispatch({ type: "hasError", payload: { hasError: errorsSet.size > 0 } });
    },
    [dispatch, errorsSet]
  );
  const deleteError = useCallback(
    (error) => {
      if (!errorsSet.has(error)) {
        return;
      }
      errorsSet.delete(error);
      dispatch({ type: "hasError", payload: { hasError: errorsSet.size > 0 } });
    },
    [dispatch, errorsSet]
  );
  const { isLoading, hasError } = state;

  const value = useMemo(
    () => ({
      isLoading,
      hasError,
      wait,
      done,
      addError,
      deleteError,
    }),
    [isLoading, hasError, addError, deleteError, wait, done]
  );

  return (
    <>
      {isLoading && (
        <div style={styles.LoaderBox}>
          <Loader />
        </div>
      )}
      {hasError && (
        <div style={styles.ErrorBox}>
          <Error
            size={32}
            color="red"
            title={"Oups, une erreur est survenue"}
          />
        </div>
      )}
      <GlobalLoaderContext.Provider value={value}>
        {props.children}
      </GlobalLoaderContext.Provider>
    </>
  );
}
