import { lazy } from "react";
import { importMDX } from "mdx.macro";
import { Suspense } from "~/components";

const Content = lazy(() => importMDX("./ConditionsUtilisation.md"));
export function ConditionsUtilisation(props) {
  return (
    <div>
      <Suspense>
        <Content />
      </Suspense>
    </div>
  );
}
