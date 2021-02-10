import { lazy } from "react";
import { importMDX } from "mdx.macro";
import { Suspense } from "~/components";

const Content = lazy(() => importMDX("./MentionsLegales.md"));
export function MentionsLegales(props) {
  return (
    <div>
      <Suspense>
        <Content />
      </Suspense>
    </div>
  );
}
