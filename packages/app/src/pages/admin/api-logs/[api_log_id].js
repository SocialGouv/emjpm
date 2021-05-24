import { Link as StyledLink } from "rebass";

import { AdminApiLog } from "~/containers/AdminApiLogs/AdminApiLog";
import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function ApiLogsViewPage() {
  const { api_log_id } = useParams();
  const id = parseInt(api_log_id);

  return (
    <LayoutAdmin>
      <BoxWrapper mt={3} px={1}>
        <Link
          to="/admin/api-logs"
          component={(props) => (
            <StyledLink
              onClick={() => props.navigate(props.href)}
              mb={4}
              display="block"
            >
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
