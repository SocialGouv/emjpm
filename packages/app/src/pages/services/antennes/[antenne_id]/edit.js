import { useParams } from "react-router-dom";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { ServiceAntenneEdit } from "~/containers/ServiceAntenneEdit";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function ServiceAntenneEditPage() {
  const { antenne_id } = useParams();
  const antenneId = parseInt(antenne_id);
  const user = useUser();

  return (
    <LayoutServices>
      <BoxWrapper mt={3}>
        <HeadingTitle mx="1">{"Modification de l'antenne"}</HeadingTitle>
        <ServiceAntenneEdit user={user} antenneId={antenneId} mt="3" />
      </BoxWrapper>
    </LayoutServices>
  );
}

export default ServiceAntenneEditPage;
