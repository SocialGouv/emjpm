import { Flex } from "rebass";

import { LayoutSdpf } from "~/containers/Layout";

import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function ServiceBoardView() {
  return (
    <>
      <SkipToContent skipTo="vos_indicateurs" />
      <LayoutSdpf>
        <BoxWrapper mt={3} px="1">
          <Flex></Flex>
        </BoxWrapper>
      </LayoutSdpf>
    </>
  );
}

export default ServiceBoardView;
