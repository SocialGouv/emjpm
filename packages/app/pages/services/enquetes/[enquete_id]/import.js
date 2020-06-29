import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { EnqueteImportPanel } from "../../../../src/components/EnqueteImport";
import { LayoutServices } from "../../../../src/components/Layout";
import { UserContext } from "../../../../src/components/UserContext";
import { withAuthSync } from "../../../../src/util/auth";

const ImportEnquetePage = ({ enqueteId }) => {
  const user = useContext(UserContext);
  return (
    <LayoutServices>
      <BoxWrapper>
        <EnqueteImportPanel enqueteId={enqueteId} userId={user.id} />
      </BoxWrapper>
    </LayoutServices>
  );
};

ImportEnquetePage.getInitialProps = async ({ query }) => {
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(ImportEnquetePage);
