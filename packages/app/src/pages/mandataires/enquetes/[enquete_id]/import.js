import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { EnqueteImportPanel } from "~/components/EnqueteImport";
import { LayoutMandataire } from "~/components/Layout";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const ImportEnquetePage = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  const query = useQuery();
  const enqueteId = Number(query.enquete_id);

  return (
    <LayoutMandataire>
      <BoxWrapper>
        <EnqueteImportPanel
          goToStep={(enqueteId, { step, substep }) => {
            history.push("/mandataires/enquetes/[enquete_id]", {
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

export default ImportEnquetePage;
