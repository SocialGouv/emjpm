import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { AdminApiLogs } from "../../../src/components/AdminApiLogs";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const ApiLogsIndex = () => (
  <LayoutAdmin>
    <BoxWrapper mt={4} px={1}>
      <AdminApiLogs />
    </BoxWrapper>
  </LayoutAdmin>
);

export default withAuthSync(ApiLogsIndex);
