import { useContext } from "react";
import { useParams } from "react-router-dom";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { ServiceAntenneEdit } from "~/containers/ServiceAntenneEdit";
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper } from "~/components/Grid";

function ServiceAntenneEditPage() {
  const params = useParams();
  const antenneId = parseInt(params.antenne_id);
  const user = useContext(UserContext);

  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <HeadingTitle mx="1">{"Modification de l'antenne"}</HeadingTitle>
        <ServiceAntenneEdit user={user} antenneId={antenneId} mt="3" />
      </BoxWrapper>
    </LayoutServices>
  );
}

export default ServiceAntenneEditPage;
