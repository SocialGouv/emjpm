import { useHistory, useParams } from "react-router-dom";

import { EnqueteImportPanel } from "~/containers/EnqueteImport";
import { LayoutMandataire } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function ImportEnquetePage() {
  const user = useUser();
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
