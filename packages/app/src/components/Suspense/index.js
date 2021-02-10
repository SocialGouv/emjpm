import { Suspense as ReactSuspense } from "react";
import Fallback from "./Fallback";

export default function Suspense(props) {
  return <ReactSuspense {...props} />;
}

Suspense.defaultProps = {
  fallback: <Fallback />,
};
