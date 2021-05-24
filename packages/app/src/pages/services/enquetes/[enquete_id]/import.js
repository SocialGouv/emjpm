import { useHistory, useParams } from "react-router-dom";

import { EnqueteImportPanel } from "~/containers/EnqueteImport";
import { LayoutServices } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function ImportEnquetePage() {
  const { enquete_id } = useParams();
  const enqueteId = parseInt(enquete_id);
  const user = useUser();
  const history = useHistory();
  return (
    <LayoutServices>
      <BoxWrapper>
        <EnqueteImportPanel
          goToStep={(enqueteId, { step, substep }) => {
            history.push({
              pathname: `/services/enquetes/${enqueteId}`,
              search: `?step=${step}&substep=${substep}`,
            });
          }}
          enqueteId={enqueteId}
          userId={user.id}
        />
      </BoxWrapper>
    </LayoutServices>
  );
}

export default ImportEnquetePage;
