import { useRouter } from "next/router";
import React, { useContext } from "react";

import { EnqueteImportPanel } from "~/components/EnqueteImport";
import { LayoutServices } from "~/components/Layout";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const ImportEnquetePage = ({ enqueteId }) => {
  const user = useContext(UserContext);
  const router = useRouter();
  return (
    <LayoutServices>
      <BoxWrapper>
        <EnqueteImportPanel
          goToStep={(enqueteId, { step, substep }) => {
            router.push("/services/enquetes/[enquete_id]", {
              pathname: `/services/enquetes/${enqueteId}`,
              query: { step, substep },
            });
          }}
          enqueteId={enqueteId}
          userId={user.id}
        />
      </BoxWrapper>
    </LayoutServices>
  );
};

ImportEnquetePage.getInitialProps = async ({ query }) => {
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(ImportEnquetePage);
