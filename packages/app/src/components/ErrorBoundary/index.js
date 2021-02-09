import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./ErrorFallback";

export default function ErrorBoundary(props) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback} {...props} />;
}
