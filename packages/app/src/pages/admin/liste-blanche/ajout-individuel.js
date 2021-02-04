import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/containers/Link";
import { ListeBlancheIndividuelCreate } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";

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
