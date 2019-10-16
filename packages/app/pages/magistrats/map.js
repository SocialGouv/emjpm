import React from "react";

import { withAuthSync } from "../../src/util/auth";
import { LayoutMagistratMap } from "../../src/components-v2/Layout";
import { UserInformations } from "../../src/components-v2/UserInformations";
import { MagistratMandatairesMap } from "../../src/components-v2/MagistratMandatairesMap";

const Map = () => {
  return (
    <LayoutMagistratMap>
      <UserInformations
        Component={props => {
          return <MagistratMandatairesMap {...props} />;
        }}
      />
    </LayoutMagistratMap>
  );
};

export default withAuthSync(Map);
