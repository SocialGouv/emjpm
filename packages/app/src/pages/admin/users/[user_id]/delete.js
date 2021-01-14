import { Flex } from "rebass";

import { AdminUserDelete } from "~/components/AdminUserDelete";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function AdminUserDeletePage() {
  const { user_id: userId } = useParams();

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
