import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";

import { ListeBlancheIndividuelUpdate } from "./ListeBlancheIndividuel";
import { ListeBlanchePreposeUpdate } from "./ListeBlanchePrepose";
import { LB_USER } from "./queries";

export function ListeBlancheEdit(props) {
  const { handleSubmit, handleCancel } = props;
  const { id: paramId } = useParams();
  const id = parseInt(paramId);

  const { data, error, loading } = useQuery(LB_USER, {
    variables: {
      id,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <div>
      {data && data.lb_users_by_pk && (
        <>
          <Helmet>
            <title>
              {`${data.lb_users_by_pk?.nom} ${data.lb_users_by_pk?.prenom} | e-MJPM`}{" "}
            </title>
          </Helmet>
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
              handleCancel={handleCancel}
              data={data.lb_users_by_pk}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ListeBlancheEdit;
