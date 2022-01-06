import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { DirectionEnqueteDetailsReponsesList } from "~/containers/EnqueteDirection/DirectionEnqueteDetailsReponsesList";
import { LayoutDirection } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function DirectionEnqueteDetailsPage() {
  const { enquete_id } = useParams();
  const enqueteId = parseInt(enquete_id);

  return (
    <>
      <Helmet>
        <title>Enquête {enquete_id} | e-MJPM</title>
      </Helmet>
      <LayoutDirection>
        <BoxWrapper mt={1} px="1">
          <DirectionEnqueteDetailsReponsesList enqueteId={enqueteId} />
        </BoxWrapper>
      </LayoutDirection>
    </>
  );
}

export default DirectionEnqueteDetailsPage;
