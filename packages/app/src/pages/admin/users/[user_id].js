import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminUser } from "~/components/AdminUser";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { withAuthSync } from "~/util/auth";

const User = (props) => {
  const { userId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper py={1}>
        <Link href="/admin/users">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminUser userId={userId} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

User.getInitialProps = async ({ query }) => {
  return { userId: query.user_id };
};

export default withAuthSync(User);
