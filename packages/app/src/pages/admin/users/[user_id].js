import { Link as StyledLink } from "rebass";

import { AdminUser } from "~/containers/AdminUser";
import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/containers/Link";
import { BoxWrapper } from "~/components/Grid";

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
