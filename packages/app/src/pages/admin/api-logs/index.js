import { AdminApiLogs } from "~/components/AdminApiLogs";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui/Grid";

const ApiLogsIndex = () => (
  <LayoutAdmin>
    <BoxWrapper mt={4} px={1}>
      <AdminApiLogs />
    </BoxWrapper>
  </LayoutAdmin>
);

export default ApiLogsIndex;
