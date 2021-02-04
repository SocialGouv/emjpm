import { EnqueteCreate } from "~/containers/EnqueteCreate";
import { LayoutDirection } from "~/containers/Layout";
import { Card, Heading } from "~/components";
import { BoxWrapper } from "~/components/Grid";

function CreateEnquete() {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Card p={5}>
          <Heading size={2} mb={3}>
            Créer une enquête
          </Heading>
          <EnqueteCreate />
        </Card>
      </BoxWrapper>
    </LayoutDirection>
  );
}

export default CreateEnquete;
