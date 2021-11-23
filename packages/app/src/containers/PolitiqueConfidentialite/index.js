import { lazy } from "react";
import { importMDX } from "mdx.macro";
import { Suspense } from "~/components";
import mdComponents from "~/utils/mdx/md-components";

const Content = lazy(() => importMDX("./PolitiqueConfidentialite.md"));
export function PolitiqueConfidentialite() {
  return (
    <div>
      <Suspense>
        <Content components={mdComponents} />
      </Suspense>
    </div>
  );
}
