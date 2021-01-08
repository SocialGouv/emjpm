import { useCallback } from "react";
import useEffectObjectValuesChange from "./useEffectObjectValuesChange";

export default function useEffectObjectValuesChangeCallback(
  obj,
  func,
  callbackArgs = []
) {
  const callback = useCallback(func, [...callbackArgs, func]);
  useEffectObjectValuesChange(obj, callback);
}
