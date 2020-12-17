import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Card, Link as StyledLink } from "rebass";

import { AdminServiceMesures } from "~/components/AdminServices";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { MesureImportPanel } from "~/components/MesureImport";
import { ServiceEditInformations } from "~/components/ServiceEditInformations";
import { withAuthSync } from "~/util/auth";

const Service = (props) => {
  const { serviceId } = props;
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/services">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <Box width="100%">
          <ServiceEditInformations
            serviceId={serviceId}
            cancelLink="/admin/services"
          />
        </Box>
        <Card my={1}>
          <AdminServiceMesures serviceId={serviceId} />
        </Card>
        <Card my={1}>
          <MesureImportPanel serviceId={serviceId} />
        </Card>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

Service.getInitialProps = async ({ query }) => {
  return { serviceId: query.service_id };
};

export default withAuthSync(Service);
