import { useHistory } from "react-router-dom";
import { Flex } from "rebass";

import { AdminFilterBar } from "~/containers/AdminFilterBar";
import { AdminFilterProvider } from "~/containers/AdminFilterBar/context";
import { AdminTribunaux } from "~/containers/AdminTribunaux";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminTribunauxPage() {
  const history = useHistory();
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <HeadingTitle>Liste des tribunaux</HeadingTitle>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <AdminFilterBar
              onAddButtonClick={() =>
                history.push("/admin/tribunaux/add-tribunal")
              }
              useDepartementfilter={true}
            />
            <AdminTribunaux />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
}

export default AdminTribunauxPage;
