import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";

import { ListeBlancheIndividuelUpdate } from "./ListeBlancheIndividuel";
import { ListeBlanchePreposeUpdate } from "./ListeBlanchePrepose";
import { ListeBlancheServiceUpdate } from "./ListeBlancheService";
import { LISTE_BLANCHE_BY_PK } from "./queries";

export function ListeBlancheEdit(props) {
  const { handleSubmit, handleCancel } = props;
  const { id: paramId } = useParams();
  const id = parseInt(paramId);

  const { data, error, loading } = useQuery(LISTE_BLANCHE_BY_PK, {
    variables: {
      id,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <div id="list_blanche_edit">
      {data && data.liste_blanche_by_pk && (
        <>
          {data.liste_blanche_by_pk.type === "prepose" && (
            <ListeBlanchePreposeUpdate
              id={id}
              handleSubmit={handleSubmit}
              data={data.liste_blanche_by_pk}
            />
          )}
          {data.liste_blanche_by_pk.type === "individuel" && (
            <ListeBlancheIndividuelUpdate
              id={id}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              data={data.liste_blanche_by_pk}
            />
          )}
          {data.liste_blanche_by_pk.type === "service" && (
            <ListeBlancheServiceUpdate
              listeBlancheId={id}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ListeBlancheEdit;
