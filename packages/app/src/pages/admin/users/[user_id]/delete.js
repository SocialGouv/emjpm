import React from "react";
import { Flex } from "rebass";

import { AdminUserDelete } from "~/components/AdminUserDelete";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const AdminUserDeletePage = () => {
  const { user_id: userId } = useQuery();

  return (
    <LayoutAdmin>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <AdminUserDelete userId={userId} />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default AdminUserDeletePage;
