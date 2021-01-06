import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminApiLog } from "~/components/AdminApiLogs/AdminApiLog";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const ApiLogsViewPage = () => {
  const { api_log_id: id } = useQuery();

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link to="/admin/api-logs">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminApiLog id={id} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default ApiLogsViewPage;
