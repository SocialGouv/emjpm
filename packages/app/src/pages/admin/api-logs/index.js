import { AdminApiLogs } from "~/containers/AdminApiLogs";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import { SkipToContent } from "~/components";

const ApiLogsIndex = () => (
  <>
    <Helmet>
      <title> Api logs | e-MJPM </title>
    </Helmet>
    <SkipToContent skipTo="api_logs" />
    <LayoutAdmin>
      <BoxWrapper mt={3} px={1}>
        <AdminApiLogs />
      </BoxWrapper>
    </LayoutAdmin>
  </>
);

export default ApiLogsIndex;
