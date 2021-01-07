import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutServices } from "~/components/Layout";
import { ServiceAntenneEdit } from "~/components/ServiceAntenneEdit";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

const ServiceAntenneEditPage = () => {
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
};

export default ServiceAntenneEditPage;
