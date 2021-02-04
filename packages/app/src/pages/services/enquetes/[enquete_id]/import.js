import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import { EnqueteImportPanel } from "~/containers/EnqueteImport";
import { LayoutServices } from "~/containers/Layout";
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper } from "~/components/Grid";

function ImportEnquetePage() {
  const query = useParams();
  const enqueteId = Number(query.enquete_id);
  const user = useContext(UserContext);
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
