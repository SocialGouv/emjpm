import { Helmet } from "react-helmet";

import { EnqueteCreate } from "~/containers/EnqueteCreate";
import { LayoutDirection } from "~/containers/Layout";
import { Card, Heading } from "~/components";
import { BoxWrapper } from "~/components/Grid";

function CreateEnquete() {
  return (
    <>
      <Helmet>
        <title>Créer une enquête | e-MPJM</title>
      </Helmet>
      <LayoutDirection>
        <BoxWrapper mt={3} px="1">
          <Card p={5}>
            <Heading size={2} mb={3}>
              Créer une enquête
            </Heading>
            <EnqueteCreate />
          </Card>
        </BoxWrapper>
      </LayoutDirection>
    </>
  );
}

export default CreateEnquete;
