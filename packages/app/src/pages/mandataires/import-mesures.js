import { useState } from "react";
import { Card, Flex } from "rebass";
import { NavLink } from "theme-ui";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureImport } from "~/containers/MandataireMesureImport";
import { MandataireOcmiMesureImport } from "~/containers/MandataireOcmiMesureImport";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function ImportMesures() {
  const user = useUser();
  const { mandataire = {} } = user;
  const { lb_user = {} } = mandataire;
  const { ocmi_mandataire } = lb_user;

  const [importType, setImportType] = useState(
    ocmi_mandataire ? "ocmi" : "file"
  );

  function ImportTypeTab({ type, children }) {
    return (
      <NavLink
        sx={{
          bg: importType === type ? "white" : "",
          borderRadius: "10px 10px 0 0",
          px: "3",
          py: "2",
        }}
        onClick={() => setImportType(type)}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <LayoutMandataire>
      <BoxWrapper mt={3} px="1">
        <Flex>
          {ocmi_mandataire && (
            <ImportTypeTab type="ocmi">
              A partir de votre compte OCMI
            </ImportTypeTab>
          )}
          <ImportTypeTab type="file">{`À partir d'un fichier`}</ImportTypeTab>
        </Flex>
        <Card mb="5" pt="5">
          {importType === "ocmi" && (
            <MandataireOcmiMesureImport mandataireUserId={user.id} />
          )}
          {importType === "file" && (
            <MandataireMesureImport mandataireUserId={user.id} />
          )}
        </Card>
      </BoxWrapper>
    </LayoutMandataire>
  );
}

export default ImportMesures;
