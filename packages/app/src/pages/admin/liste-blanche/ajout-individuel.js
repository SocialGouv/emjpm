import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheIndividuelCreate } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";

export default function ListBlancheAjoutIndividuel() {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
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
        <HeadingTitle mb={4}>
          {"Ajout d'un mandataire individuel à la liste blanche"}
        </HeadingTitle>
        <ListeBlancheIndividuelCreate />
      </BoxWrapper>
    </LayoutAdmin>
  );
}
