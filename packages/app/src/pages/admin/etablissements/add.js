import { Link as StyledLink } from "rebass";

import { EtablissementImport } from "~/containers/Etablissement";
import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/components/Grid";

export function AddEtablissementPage() {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link
          to="/admin/etablissements"
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
        <EtablissementImport />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default AddEtablissementPage;
