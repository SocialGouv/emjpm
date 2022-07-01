import { Card } from "rebass";

import { LayoutSdpf } from "~/containers/Layout";
import { SdpfInformations } from "~/containers/SdpfInformations";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import { SkipToContent } from "~/components";

function Informations() {
  return (
    <>
      <Helmet>
        <title>Informations sur votre service | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="service_informations" />
      <LayoutSdpf>
        <BoxWrapper
          px="1"
          id="service_informations"
          tabIndex="-1"
          sx={{ margin: "0px auto", marginTop: "20px" }}
        >
          <Card p="5" m={2}>
            <SdpfInformations mt="3" />
          </Card>
        </BoxWrapper>
      </LayoutSdpf>
    </>
  );
}

export default Informations;
