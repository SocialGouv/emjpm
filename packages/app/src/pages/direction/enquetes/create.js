import { Helmet } from "react-helmet";

import { EnqueteCreate } from "~/containers/EnqueteCreate";
import { LayoutDirection } from "~/containers/Layout";
import { Card, Heading, SkipToContent } from "~/components";
import { BoxWrapper } from "~/components/Grid";

function CreateEnquete() {
  return (
    <>
      <Helmet>
        <title>Créer une enquête | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="direction_enquete_create" />
      <LayoutDirection>
        <BoxWrapper mt={3} px="1">
          <Card p={5} id="direction_enquete_create">
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
