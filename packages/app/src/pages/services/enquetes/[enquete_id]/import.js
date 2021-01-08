import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import { EnqueteImportPanel } from "~/components/EnqueteImport";
import { LayoutServices } from "~/components/Layout";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

const ImportEnquetePage = () => {
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
