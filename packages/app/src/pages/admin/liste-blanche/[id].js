import { useHistory, useParams } from "react-router-dom";
import { Link as StyledLink } from "rebass";

import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheEdit } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";

function ListeBlancheDetailPage() {
  const { id: paramId } = useParams();
  const id = parseInt(paramId);

  const history = useHistory();

  return (
    <LayoutAdmin>
      <BoxWrapper mt={3} px={1}>
        <Link
          to="/admin/liste-blanche"
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
        <ListeBlancheEdit
          id={id}
          handleSubmit={async () => {
            await history.push("/admin/liste-blanche");
            window.scrollTo(0, 0);
          }}
          handleCancel={async () => {
            await history.push("/admin/liste-blanche");
            window.scrollTo(0, 0);
          }}
        />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default ListeBlancheDetailPage;
