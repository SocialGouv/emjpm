import React from "react";

import dynamic from "next/dynamic";
import { withAuthSync } from "../../src/util/auth";
import { LayoutMagistratMap } from "../../src/components-v2/Layout";
import { useWindowSize } from "../../src/lib/hooks";

const MagistratMandatairesMap = dynamic(
  () =>
    import("../../src/components-v2/MagistratMandatairesMap").then(
      mod => mod.MagistratMandatairesMap
    ),
  { ssr: false }
);

const Map = () => {
  const { innerHeight, innerWidth } = useWindowSize();
  return (
    <LayoutMagistratMap>
      <MagistratMandatairesMap height={innerHeight} width={innerWidth} />
    </LayoutMagistratMap>
  );
};

export default withAuthSync(Map);
