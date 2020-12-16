import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminApiLog } from "~/components/AdminApiLogs/AdminApiLog";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const ApiLogsViewPage = (props) => {
  const { id } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/api-logs">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminApiLog id={id} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

ApiLogsViewPage.getInitialProps = async ({ query }) => ({
  id: query.api_log_id,
});

export default withAuthSync(ApiLogsViewPage);
