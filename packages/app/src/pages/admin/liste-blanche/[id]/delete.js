import { Flex } from "rebass";

import { AdminLbUserDelete } from "~/components/AdminLbUserDelete";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function AdminUserDeletePage() {
  const { id: lbUserId } = useParams();

  return (
    <LayoutAdmin>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <AdminLbUserDelete lbUserId={lbUserId} />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default AdminUserDeletePage;
