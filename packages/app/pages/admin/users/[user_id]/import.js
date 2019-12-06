import { BoxWrapper, Card, Heading1, Heading4 } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React from "react";

// import { AdminUserInformations } from "../../../../src/components-v2/AdminUsers/AdminUserInformations";
import { LayoutAdmin } from "../../../../src/components-v2/Layout";
import { MandataireAddMesureImport } from "../../../../src/components-v2/MandataireMesureImport/MandataireAddMesureImport";
import { withAuthSync } from "../../../../src/util/auth";

const Import = props => {
  const { userId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt={6} px={1}>
        <Heading1 mb={2}>
          <Link href={`/users/${userId}`}>
            <a>Utilisateur #{userId} </a>
          </Link>
          / Import
        </Heading1>
        <Card mb={2}>
          <Heading4 mb={2}>Selectionnez le fichier</Heading4>
          <MandataireAddMesureImport userId={userId} />
        </Card>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

Import.getInitialProps = async ({ query }) => {
  return { userId: query.user_id };
};

export default withAuthSync(Import);
