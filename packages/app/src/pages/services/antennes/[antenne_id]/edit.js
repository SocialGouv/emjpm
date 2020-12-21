import { useRouter } from "next/router";
import React, { useContext } from "react";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutServices } from "~/components/Layout";
import { ServiceAntenneEdit } from "~/components/ServiceAntenneEdit";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const ServiceAntenneEditPage = () => {
  const router = useRouter();
  const antenneId = parseInt(router.query.antenne_id);
  const user = useContext(UserContext);

  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <HeadingTitle mx="1">{`Modification de l'antenne`}</HeadingTitle>
        <ServiceAntenneEdit user={user} antenneId={antenneId} mt="3" />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(ServiceAntenneEditPage);
