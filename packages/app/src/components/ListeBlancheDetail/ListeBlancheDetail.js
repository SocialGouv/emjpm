import { useQuery } from "@apollo/react-hooks";
import React, { useMemo } from "react";

import { LoadingWrapper } from "../Commons";
import { ListeBlancheItemCard } from "../ListeBlanche/ListeBlancheItemCard";
import { ListeBlancheForm } from "./ListeBlancheForm";
import { LB_USER } from "./queries";

const ListeBlancheDetail = ({ lbUserId }) => {
  const { data, error, loading } = useQuery(LB_USER, {
    variables: {
      id: lbUserId,
    },
  });

  const user = useMemo(
    () => (data && data.lb_users && data.lb_users.length ? data.lb_users[0] : undefined),
    [data]
  );

  return (
    <LoadingWrapper loading={loading || !user} error={error}>
      <ListeBlancheItemCard item={user} />
      <ListeBlancheForm data={user} />
    </LoadingWrapper>
  );
};

export { ListeBlancheDetail };
