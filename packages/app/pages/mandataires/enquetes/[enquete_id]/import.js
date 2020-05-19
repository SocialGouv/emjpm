import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { EnqueteImportPanel } from "../../../../src/components/EnqueteImport";
import { LayoutMandataire } from "../../../../src/components/Layout";
import { UserContext } from "../../../../src/components/UserContext";
import { withAuthSync } from "../../../../src/util/auth";

const ImportEnquetePage = ({ enqueteId }) => {
  const user = useContext(UserContext);
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <EnqueteImportPanel enqueteId={enqueteId} mandataireUserId={user.id} />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

ImportEnquetePage.getInitialProps = async ({ query }) => {
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(ImportEnquetePage);
