import { useHistory } from "react-router-dom";
import { Flex } from "rebass";

import { AdminFilterBar } from "~/components/AdminFilterBar";
import { AdminFilterProvider } from "~/components/AdminFilterBar/context";
import { AdminTribunaux } from "~/components/AdminTribunaux";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

const AdminTribunauxPage = () => {
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
};

export default AdminTribunauxPage;
