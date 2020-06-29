import { BoxWrapper } from "@emjpm/ui";
import { useRouter } from "next/router";
import React, { useContext } from "react";

import { EnqueteImportPanel } from "../../../../src/components/EnqueteImport";
import { LayoutMandataire } from "../../../../src/components/Layout";
import { UserContext } from "../../../../src/components/UserContext";
import { withAuthSync } from "../../../../src/util/auth";

const ImportEnquetePage = ({ enqueteId }) => {
  const user = useContext(UserContext);
  const router = useRouter();
  return (
    <LayoutMandataire>
      <BoxWrapper>
        <EnqueteImportPanel
          goToStep={(enqueteId, { step, substep }) => {
            router.push("/mandataires/enquetes/[enquete_id]", {
              pathname: `/mandataires/enquetes/${enqueteId}`,
              query: { step, substep },
            });
          }}
          enqueteId={enqueteId}
          userId={user.id}
        />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

ImportEnquetePage.getInitialProps = async ({ query }) => {
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(ImportEnquetePage);
