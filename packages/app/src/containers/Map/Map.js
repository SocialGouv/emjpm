import { lazy } from "react";
import { Suspense } from "~/components";

const LazyMap = lazy(() => import("./Lazy/Map"));

function Map(props) {
  return (
    <Suspense>
      <LazyMap {...props} />
    </Suspense>
  );
}

export { Map };
