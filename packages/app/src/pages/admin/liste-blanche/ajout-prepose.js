import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlanchePreposeCreate } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";

function ListBlanchePage() {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link
          to="/admin/liste-blanche"
          component={() => (
            <StyledLink mb={4} display="block">
              &larr; Retour
            </StyledLink>
          )}
        />
        <HeadingTitle mb={4}>
          {"Ajout d'un mandataire préposé à la liste blanche"}
        </HeadingTitle>
        <ListeBlanchePreposeCreate />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default ListBlanchePage;
