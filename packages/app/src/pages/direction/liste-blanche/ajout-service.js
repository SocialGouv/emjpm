import { useHistory } from "react-router-dom";
import { Link as StyledLink } from "rebass";
import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutDirection } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceCreate } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function ListBlanchePage() {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Ajout d'un engistrement à la liste blanche | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="list_blanche_service_create" />
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
            {"Ajout d'un engistrement à la liste blanche"}
          </HeadingTitle>
          <ListeBlancheServiceCreate
            onSuccess={async () => {
              await history.push("/direction");
            }}
            handleCancel={async () => {
              await history.push("/direction");
            }}
          />
        </BoxWrapper>
      </LayoutDirection>
    </>
  );
}

export default ListBlanchePage;
