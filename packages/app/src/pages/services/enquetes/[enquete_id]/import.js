import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { EnqueteImportPanel } from "~/components/EnqueteImport";
import { LayoutServices } from "~/components/Layout";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const ImportEnquetePage = () => {
  const query = useQuery();
  const enqueteId = Number(query.enquete_id);
  const user = useContext(UserContext);
  const history = useHistory();
  return (
    <LayoutServices>
      <BoxWrapper>
        <EnqueteImportPanel
          goToStep={(enqueteId, { step, substep }) => {
            history.push("/services/enquetes/[enquete_id]", {
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

export default ImportEnquetePage;
