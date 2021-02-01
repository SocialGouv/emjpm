import { Link as StyledLink } from "rebass";

import { AdminUser } from "~/components/AdminUser";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function User() {
  const { user_id: userId } = useParams();

  return (
    <LayoutAdmin>
      <BoxWrapper py={1}>
        <Link
          to="/admin/users"
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
        <AdminUser userId={userId} />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default User;
