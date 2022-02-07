import { Flex } from "rebass";

import { AdminListeBlancheDelete } from "~/containers/AdminListeBlancheDelete";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { SkipToContent } from "~/components";

function AdminUserDeletePage() {
  const { id: paramId } = useParams();
  const id = parseInt(paramId);

  return (
    <>
      <SkipToContent skipTo="adminlist_dblanche_delete" />
      <LayoutAdmin>
        <BoxWrapper mt="6" px="1">
          <Flex flexWrap="wrap" mt="2">
            <AdminListeBlancheDelete listeBlancheId={id} />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </>
  );
}

export default AdminUserDeletePage;
