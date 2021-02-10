import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";

import { EtablissementViewForm } from "./EtablissementViewForm";
import { ETABLISSEMENT } from "./queries";

export function EtablissementView() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(ETABLISSEMENT, {
    variables: { id },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  if (data && data.etablissements_by_pk) {
    const etablissement = data.etablissements_by_pk;
    return <EtablissementViewForm data={etablissement} />;
  }
}

export default EtablissementView;
