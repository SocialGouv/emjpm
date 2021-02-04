import useSearchParams from "~/hooks/useSearchParams";
import castInt from "~/util/castInt";

export function useCurrentStepFromUrl() {
  const { step, substep } = useSearchParams();
  return {
    step: castInt(step, 0),
    substep: castInt(substep, 0),
  };
}
