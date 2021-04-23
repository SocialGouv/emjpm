import { useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";

import { ListeBlancheMandataires } from "./ListeBlancheMandataires";
import { ListeBlancheServices } from "./ListeBlancheServices";

const getHref = (item) => {
  const { type, origin, id } = item;
  if (type === "mandataire") {
    return `/${origin}/liste-blanche/${id}`;
  } else if (type === "service") {
    return `/${origin}/liste-blanche/services/${id}`;
  }
};

export function ListeBlanche(props) {
  const { origin } = props;
  const { filters } = useContext(FiltersContextSerializable);
  const history = useHistory();

  const { type = "mandataire" } = filters;

  const getHrefCall = useCallback(
    (item) => getHref({ id: item.id, origin, type }),
    [origin, type]
  );

  const onRowClick = async (item, e) => {
    if (e.ctrlKey) {
      return;
    }
    e.preventDefault();
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      return;
    }
    const to = getHrefCall(item);
    if (to) {
      await history.push(to);
    }
    window.scrollTo(0, 0);
  };

  return type === "mandataire" ? (
    <ListeBlancheMandataires
      {...props}
      getHref={getHrefCall}
      onRowClick={onRowClick}
    />
  ) : (
    <ListeBlancheServices
      {...props}
      getHref={getHrefCall}
      onRowClick={onRowClick}
    />
  );
}

export default ListeBlanche;
