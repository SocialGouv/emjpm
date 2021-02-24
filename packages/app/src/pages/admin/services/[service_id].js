import { Box, Card, Link as StyledLink } from "rebass";

import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { MesureImportPanel } from "~/containers/MesureImport";
import { ServiceEditInformations } from "~/containers/ServiceEditInformations";
import { BoxWrapper } from "~/components/Grid";

import { AdminServiceMesures } from "~/containers/AdminServices";

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
