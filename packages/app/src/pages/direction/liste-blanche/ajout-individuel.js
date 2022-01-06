import { Link as StyledLink } from "rebass";
import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutDirection } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheIndividuelCreate } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";

function ListBlanchePage() {
  return (
    <>
      <Helmet>
        <title>
          Ajout d'un mandataire individuel à la liste blanche | e-MJPM
        </title>
      </Helmet>
      <LayoutDirection>
        <BoxWrapper mt={3} px={1}>
          <Link
            to="/direction"
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
      </LayoutDirection>
    </>
  );
}

export default ListBlanchePage;
