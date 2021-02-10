import { lazy } from "react";
import { importMDX } from "mdx.macro";
import { Suspense } from "~/components";

const Content = lazy(() => importMDX("./PolitiqueConfidentialite.md"));
export function PolitiqueConfidentialite(props) {
  return (
    <div>
      <Suspense>
        <Content />
      </Suspense>
    </div>
  );
}
