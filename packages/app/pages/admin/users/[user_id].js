import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminUser } from "../../../src/components/AdminUser";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const User = (props) => {
  const { userId, type, active } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper py={1}>
        <Link href="/admin/users">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminUser userId={userId} active={active} type={type} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

User.getInitialProps = async ({ query }) => {
  return { active: query.active, type: query.type, userId: query.user_id };
};

export default withAuthSync(User);
