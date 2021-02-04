import { EnqueteCreate } from "~/components/EnqueteCreate";
import { LayoutDirection } from "~/components/Layout";
import { Card, Heading } from "~/ui";
import { BoxWrapper } from "~/ui/Grid";

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
