import { Flex } from "rebass";

import { AdminAddTribunal } from "~/containers/AdminTribunaux/AdminAddTribunal";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AddTribunauxPage() {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>{"Création d'un tribunal"}</HeadingTitle>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
          }}
        >
          <AdminAddTribunal />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default AddTribunauxPage;
