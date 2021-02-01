import { useHistory } from "react-router-dom";
import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceCreate } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";

export default function ListBlancheAjoutService() {
  const history = useHistory();
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
          {"Ajout d'un service à la liste blanche"}
        </HeadingTitle>
        <ListeBlancheServiceCreate
          onSuccess={async () => {
            await history.push("/admin/liste-blanche");
          }}
          handleCancel={async () => {
            await history.push("/admin/liste-blanche");
          }}
        />
      </BoxWrapper>
    </LayoutAdmin>
  );
}
