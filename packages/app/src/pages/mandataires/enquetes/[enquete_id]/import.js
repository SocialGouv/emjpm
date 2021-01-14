import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import { EnqueteImportPanel } from "~/components/EnqueteImport";
import { LayoutMandataire } from "~/components/Layout";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

function ImportEnquetePage() {
  const user = useContext(UserContext);
  const history = useHistory();

  const query = useParams();
  const enqueteId = Number(query.enquete_id);

  return (
    <LayoutMandataire>
      <BoxWrapper>
        <EnqueteImportPanel
          goToStep={(enqueteId, { step, substep }) => {
            history.push({
              pathname: `/mandataires/enquetes/${enqueteId}`,
              search: `?step=${step}&substep=${substep}`,
            });
          }}
          enqueteId={enqueteId}
          userId={user.id}
        />
      </BoxWrapper>
    </LayoutMandataire>
  );
}

export default ImportEnquetePage;
