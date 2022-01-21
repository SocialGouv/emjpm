import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { AdminAddTribunal } from "~/containers/AdminTribunaux/AdminAddTribunal";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AddTribunauxPage() {
  return (
    <>
      <Helmet>
        <title>Création d'un tribunal | e-MJPM</title>
      </Helmet>
      <LayoutAdmin hasNavigation={false}>
        <BoxWrapper mt={3} px="1">
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
    </>
  );
}

export default AddTribunauxPage;
