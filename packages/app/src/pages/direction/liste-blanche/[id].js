import { useHistory, useParams } from "react-router-dom";
import { Link as StyledLink } from "rebass";

import { LayoutDirection } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheEdit } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";

const ListeBlancheDetailPage = () => {
  const { id } = useParams();
  const history = useHistory();

  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Link to="/direction/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>

        <ListeBlancheEdit
          id={id}
          handleSubmit={async () => {
            await history.push("/direction/liste-blanche");
            window.scrollTo(0, 0);
          }}
          handleCancel={async () => {
            await history.push("/direction/liste-blanche");
            window.scrollTo(0, 0);
          }}
        />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default ListeBlancheDetailPage;
