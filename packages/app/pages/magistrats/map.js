import React from "react";

import { LayoutMagistratMap } from "../../src/components/Layout";
import { MagistratMapMandataires } from "../../src/components/MagistratMapMandataires";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Map = () => {
  return (
    <LayoutMagistratMap>
      <UserInformations
        Component={props => {
          return <MagistratMapMandataires {...props} />;
        }}
      />
    </LayoutMagistratMap>
  );
};

export default withAuthSync(Map);
