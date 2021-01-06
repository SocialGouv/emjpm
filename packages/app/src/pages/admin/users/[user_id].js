import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminUser } from "~/components/AdminUser";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const User = () => {
  const { user_id: userId } = useQuery();

  return (
    <LayoutAdmin>
      <BoxWrapper py={1}>
        <Link to="/admin/users">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminUser userId={userId} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default User;
