import { Flex } from "rebass";

import { AdminUserDelete } from "~/containers/AdminUserDelete";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function AdminUserDeletePage() {
  const { user_id } = useParams();
  const userId = parseInt(user_id);

  return (
    <LayoutAdmin>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <AdminUserDelete userId={userId} />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default AdminUserDeletePage;
