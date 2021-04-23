import { useHistory } from "react-router-dom";
import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutDirection } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceCreate } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";

function ListBlanchePage() {
  const history = useHistory();
  return (
    <LayoutDirection>
      <BoxWrapper mt={3} px={1}>
        <Link
          to="/direction/liste-blanche"
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
}

export default ListBlanchePage;
