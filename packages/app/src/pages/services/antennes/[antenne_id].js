import { Card } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { ServiceAntenneInformations } from "~/containers/ServiceAntenneInformations";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { SkipToContent } from "../../../components";

function Antennes() {
  const { antenne_id } = useParams();
  const antenneId = parseInt(antenne_id);

  return (
    <>
      <SkipToContent skipTo="servide_antenne_informations" />
      <LayoutServices>
        <BoxWrapper m={2} px="1" id="servide_antenne_informations">
          <Card p="5" m={2}>
            <ServiceAntenneInformations antenne_id={antenneId} mt="3" />
          </Card>
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default Antennes;
