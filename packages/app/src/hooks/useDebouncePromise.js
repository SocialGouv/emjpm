import { useCallback } from "react";

export default function useDebouncePromise(func, interval, deps = []) {
  /* eslint-disable react-hooks/exhaustive-deps */
  return useCallback(debouncePromise(func, interval), [deps]);
}

function debouncePromise(f, interval = 1000) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(f(...args)), interval);
    });
  };
}
