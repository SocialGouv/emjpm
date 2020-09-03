import { useRouter } from "next/router";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { ListeBlancheMandataires } from "./ListeBlancheMandataires";
import { ListeBlancheServices } from "./ListeBlancheServices";

async function onSelectItem(router, { type, origin, id }) {
  if (type === "mandataire") {
    await router.push(`/${origin}/liste-blanche/[id]`, `/${origin}/liste-blanche/${id}`);
  } else if (type === "service") {
    await router.push(
      `/${origin}/liste-blanche/services/[id]`,
      `/${origin}/liste-blanche/services/${id}`
    );
  }
  window.scrollTo(0, 0);
}

export const ListeBlanche = (props) => {
  const { origin } = props;
  const { filters } = useContext(FiltersContextSerializable);
  const router = useRouter();

  const { type } = filters;

  return type === "mandataire" ? (
    <ListeBlancheMandataires
      {...props}
      onSelectItem={(item) => onSelectItem(router, { type, id: item.id, origin })}
    />
  ) : (
    <ListeBlancheServices
      {...props}
      onSelectItem={(item) => onSelectItem(router, { type, id: item.id, origin })}
    />
  );
};

export default ListeBlanche;
