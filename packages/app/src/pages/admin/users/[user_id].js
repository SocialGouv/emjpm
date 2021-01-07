import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminUser } from "~/components/AdminUser";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

const User = () => {
  const { user_id: userId } = useParams();

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
