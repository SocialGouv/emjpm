import { Flex } from "rebass";

import { AdminEditorCreate } from "~/containers/AdminEditors/AdminEditorCreate";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminEditorsCreatePage() {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>{"Création d'un éditeur"}</HeadingTitle>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
          }}
        >
          <AdminEditorCreate />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default AdminEditorsCreatePage;
