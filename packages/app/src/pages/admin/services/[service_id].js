import { Box, Card, Link as StyledLink } from "rebass";

import { AdminServiceMesures } from "~/components/AdminServices";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { MesureImportPanel } from "~/components/MesureImport";
import { ServiceEditInformations } from "~/components/ServiceEditInformations";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function Service() {
  const { service_id: serviceId } = useParams();
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link
          to="/admin/services"
          component={(props) => (
            <StyledLink
              onClick={() => props.navigate(props.href)}
              mb={4}
              display="block"
            >
              &larr; Retour
            </StyledLink>
          )}
        />
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
}

export default Service;
