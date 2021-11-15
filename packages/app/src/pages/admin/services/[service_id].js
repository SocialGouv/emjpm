import { Box, Link as StyledLink } from "rebass";

import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ServiceEditInformations } from "~/containers/ServiceEditInformations";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function Service() {
  const { service_id } = useParams();
  const serviceId = parseInt(service_id);

  return (
    <LayoutAdmin>
      <BoxWrapper mt={3} px={1}>
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
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default Service;
