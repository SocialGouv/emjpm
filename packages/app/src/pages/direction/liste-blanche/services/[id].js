import { useHistory, useParams } from "react-router-dom";
import { Link as StyledLink } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutDirection } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceUpdate } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";

function ListeBlancheDetailPage() {
  const { id: paramId } = useParams();
  const id = parseInt(paramId);

  const history = useHistory();

  return (
    <>
      <Helmet>
        <title>Service {paramId} | e-MPJM</title>
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

          <ListeBlancheServiceUpdate
            serviceId={id}
            onSuccess={async () => {
              await history.push("/direction");
              window.scrollTo(0, 0);
            }}
            handleCancel={async () => {
              await history.push("/direction");
              window.scrollTo(0, 0);
            }}
          />
        </BoxWrapper>
      </LayoutDirection>
    </>
  );
}

export default ListeBlancheDetailPage;
