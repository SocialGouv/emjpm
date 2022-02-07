import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { AdminEditorCreate } from "~/containers/AdminEditors/AdminEditorCreate";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function AdminEditorsCreatePage() {
  return (
    <>
      <Helmet>
        <title>Création d'un éditeur | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="admin_editor_create" />
      <LayoutAdmin hasNavigation={false}>
        <BoxWrapper mt={3} px="1">
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
    </>
  );
}

export default AdminEditorsCreatePage;
