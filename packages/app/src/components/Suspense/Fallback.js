import useLoadingState from "~/hooks/useLoadingState";

export default function SuspenseFallback() {
  useLoadingState(true);
  return <div>Chargement en cours...</div>;
}
