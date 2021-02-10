import { useContext, useEffect } from "react";
import GlobalLoaderContext from "~/components/GlobalLoader/context";

export default function useLoadingState(isLoading, error) {
  const ctx = useContext(GlobalLoaderContext);
  const { hasError, addError, deleteError, wait, done } = ctx;

  useEffect(() => {
    if (isLoading) {
      wait();
    }
    return () => {
      if (isLoading) {
        done();
      }
    };
  }, [isLoading, wait, done]);

  useEffect(() => {
    if (error) {
      addError(error);
    }
    return () => {
      if (error) {
        deleteError(error);
      }
    };
  }, [hasError, error, addError, deleteError]);

  return ctx;
}
