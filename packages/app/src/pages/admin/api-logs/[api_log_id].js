import { Link as StyledLink } from "rebass";

import { AdminApiLog } from "~/components/AdminApiLogs/AdminApiLog";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function ApiLogsViewPage() {
  const { api_log_id: id } = useParams();

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link
          to="/admin/api-logs"
          component={() => (
            <StyledLink mb={4} display="block">
              &larr; Retour
            </StyledLink>
          )}
        />
        <AdminApiLog id={id} />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default ApiLogsViewPage;
