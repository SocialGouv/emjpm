import { Flex } from "rebass";

import { AdminEditorCreate } from "~/components/AdminEditors/AdminEditorCreate";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

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
