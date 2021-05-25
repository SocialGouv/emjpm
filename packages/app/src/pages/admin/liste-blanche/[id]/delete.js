import { Flex } from "rebass";

import { AdminLbUserDelete } from "~/containers/AdminLbUserDelete";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function AdminUserDeletePage() {
  const { id: paramId } = useParams();
  const id = parseInt(paramId);

  return (
    <LayoutAdmin>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <AdminLbUserDelete lbUserId={id} />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default AdminUserDeletePage;
