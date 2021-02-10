import useLoadingState from "~/hooks/useLoadingState";

export default function useQueryReady(loading, error) {
  useLoadingState(loading, error);
  return !(loading || error);
}
