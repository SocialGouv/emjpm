import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { AdminApiLogs } from "~/components/AdminApiLogs";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const ApiLogsIndex = () => (
  <LayoutAdmin>
    <BoxWrapper mt={4} px={1}>
      <AdminApiLogs />
    </BoxWrapper>
  </LayoutAdmin>
);

export default withAuthSync(ApiLogsIndex);
