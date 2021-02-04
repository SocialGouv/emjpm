import { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";

const Content = lazy(() => importMDX("./PolitiqueConfidentialite.md"));
export function PolitiqueConfidentialite(props) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}
