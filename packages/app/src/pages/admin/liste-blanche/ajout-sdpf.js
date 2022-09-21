import { Link as StyledLink } from "rebass";
import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheSdpfCreate } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

export default function ListBlancheAjoutIndividuel() {
  return (
    <>
      <Helmet>
        <title>Ajout d'un service DPF à la liste blanche | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="liste_blanche_individuel_create" />
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
          <HeadingTitle mb={4}>
            {"Ajout d'un service DPF à la liste blanche"}
          </HeadingTitle>
          <ListeBlancheSdpfCreate />
        </BoxWrapper>
      </LayoutAdmin>
    </>
  );
}
