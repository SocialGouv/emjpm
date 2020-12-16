import { BoxWrapper, Heading1 } from "@emjpm/ui";
import { useRouter } from "next/router";
import React, { useContext } from "react";

import { LayoutServices } from "~/components/Layout";
import { ServiceAntenneEdit } from "~/components/ServiceAntenneEdit";
import { UserContext } from "~/components/UserContext";
import { withAuthSync } from "~/util/auth";

const ServiceAntenneEditPage = () => {
  const router = useRouter();
  const antenneId = parseInt(router.query.antenne_id);
  const user = useContext(UserContext);

  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">{`Modification de l'antenne`}</Heading1>
        <ServiceAntenneEdit user={user} antenneId={antenneId} mt="3" />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(ServiceAntenneEditPage);
