import React, { Fragment } from "react";
import { useQuery } from "react-apollo";

import { LoadingWrapper } from "../Commons";
import { ListeBlancheIndividuelUpdate } from "./ListeBlancheIndividuel";
import { ListeBlanchePreposeUpdate } from "./ListeBlanchePrepose";
import { LB_USER } from "./queries";

export const ListeBlancheEdit = (props) => {
  const { id, handleSubmit } = props;
  const { data, error, loading } = useQuery(LB_USER, {
    variables: {
      id,
    },
  });

  return (
    <LoadingWrapper loading={loading} error={error}>
      {data && data.lb_users_by_pk && (
        <Fragment>
          {data.lb_users_by_pk.type === "prepose" && (
            <ListeBlanchePreposeUpdate
              id={id}
              handleSubmit={handleSubmit}
              data={data.lb_users_by_pk}
            />
          )}
          {data.lb_users_by_pk.type === "individuel" && (
            <ListeBlancheIndividuelUpdate
              id={id}
              handleSubmit={handleSubmit}
              data={data.lb_users_by_pk}
            />
          )}
        </Fragment>
      )}
    </LoadingWrapper>
  );
};

export default ListeBlancheEdit;
