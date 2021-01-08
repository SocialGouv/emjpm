import { useHistory } from "react-router-dom";
import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutDirection } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceCreate } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";

const ListBlanchePage = () => {
  const history = useHistory();
  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Link to="/direction/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>

        <HeadingTitle mb={4}>
          {"Ajout d'un engistrement à la liste blanche"}
        </HeadingTitle>
        <ListeBlancheServiceCreate
          onSuccess={async () => {
            await history.push("/direction/liste-blanche");
          }}
          handleCancel={async () => {
            await history.push("/direction/liste-blanche");
          }}
        />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default ListBlanchePage;
