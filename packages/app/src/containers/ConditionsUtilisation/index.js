import { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";

const Content = lazy(() => importMDX("./ConditionsUtilisation.md"));
export function ConditionsUtilisation(props) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}
