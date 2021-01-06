import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";

import { ListeBlancheMandataires } from "./ListeBlancheMandataires";
import { ListeBlancheServices } from "./ListeBlancheServices";

async function onSelectItem(history, { type, origin, id }) {
  if (type === "mandataire") {
    await history.push(`/${origin}/liste-blanche/${id}`);
  } else if (type === "service") {
    await history.push(`/${origin}/liste-blanche/services/${id}`);
  }
  window.scrollTo(0, 0);
}

export const ListeBlanche = (props) => {
  const { origin } = props;
  const { filters } = useContext(FiltersContextSerializable);
  const history = useHistory();

  const { type = "mandataire" } = filters;

  return type === "mandataire" ? (
    <ListeBlancheMandataires
      {...props}
      onSelectItem={(item) =>
        onSelectItem(history, { id: item.id, origin, type })
      }
    />
  ) : (
    <ListeBlancheServices
      {...props}
      onSelectItem={(item) =>
        onSelectItem(history, { id: item.id, origin, type })
      }
    />
  );
};

export default ListeBlanche;
