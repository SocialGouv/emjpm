import { useHistory } from "react-router-dom";
import { Flex } from "rebass";

import { AdminEditorRequest, AdminEditors } from "~/containers/AdminEditors";
import { AdminFilterBar } from "~/containers/AdminFilterBar";
import { AdminFilterProvider } from "~/containers/AdminFilterBar/context";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminEditorsPage() {
  const history = useHistory();
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <HeadingTitle>Liste des éditeurs</HeadingTitle>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <AdminFilterBar
              onAddButtonClick={() => history.push("/admin/editors/create ")}
            />
            <AdminEditors />
            <AdminEditorRequest />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
}

export default AdminEditorsPage;
