import { useRef, useEffect } from "react";
import isEqual from "lodash/isEqual";

export default function useEffectObjectValuesChange(obj, func) {
  const prev = useRef(() => obj);
  useEffect(() => {
    if (!isEqual(obj, prev.current)) {
      prev.current = obj;
      func();
    }
  }, [obj, prev, func]);
}
