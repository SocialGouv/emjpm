import { useMatomo } from "./matomo";

export default function AppMatomo({ children }) {
  useMatomo();
  return <>{children}</>;
}
