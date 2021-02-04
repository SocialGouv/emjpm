import React, { Suspense } from "react";

const LazyMap = React.lazy(() => import("./Lazy/Map"));

function Map(props) {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LazyMap {...props} />
    </Suspense>
  );
}

export { Map };
