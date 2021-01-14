import { Card } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { ServiceAntenneInformations } from "~/components/ServiceAntenneInformations";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function Antennes() {
  const { antenne_id: antenneId } = useParams();

  return (
    <LayoutServices>
      <BoxWrapper m={2} px="1">
        <Card p="5" m={2}>
          <ServiceAntenneInformations antenne_id={antenneId} mt="3" />
        </Card>
      </BoxWrapper>
    </LayoutServices>
  );
}

export default Antennes;
