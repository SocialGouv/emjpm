import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Card } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { ServiceAntenneInformations } from "~/components/ServiceAntenneInformations";
import { withAuthSync } from "~/util/auth";

const Antennes = (props) => {
  const { antenneId } = props;

  return (
    <LayoutServices>
      <BoxWrapper m={2} px="1">
        <Card p="5" m={2}>
          <ServiceAntenneInformations antenne_id={antenneId} mt="3" />
        </Card>
      </BoxWrapper>
    </LayoutServices>
  );
};

Antennes.getInitialProps = async ({ query }) => {
  return { antenneId: query.antenne_id };
};

export default withAuthSync(Antennes);
