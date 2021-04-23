import { AdminApiLogs } from "~/containers/AdminApiLogs";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

const ApiLogsIndex = () => (
  <LayoutAdmin>
    <BoxWrapper mt={3} px={1}>
      <AdminApiLogs />
    </BoxWrapper>
  </LayoutAdmin>
);

export default ApiLogsIndex;
