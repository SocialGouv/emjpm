import { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";

const Content = lazy(() => importMDX("./MentionsLegales.md"));
export function MentionsLegales(props) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}
