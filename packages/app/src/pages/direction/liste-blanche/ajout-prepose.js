import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutDirection } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlanchePreposeCreate } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";

function ListBlanchePage() {
  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
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
          {"Ajout d'un mandataire préposé à la liste blanche"}
        </HeadingTitle>
        <ListeBlanchePreposeCreate />
      </BoxWrapper>
    </LayoutDirection>
  );
}

export default ListBlanchePage;
