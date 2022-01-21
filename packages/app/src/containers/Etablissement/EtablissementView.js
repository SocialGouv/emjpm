import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";

import { EtablissementViewForm } from "./EtablissementViewForm";
import { ETABLISSEMENT } from "./queries";

export function EtablissementView() {
  const { id: paramId } = useParams();
  const id = parseInt(paramId);

  const { data, loading, error } = useQuery(ETABLISSEMENT, {
    variables: { id },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  if (data && data.etablissements_by_pk) {
    const etablissement = data.etablissements_by_pk;

    return (
      <>
        <Helmet>
          <title>
            {etablissement?.rslongue ||
              etablissement?.libcategagretab ||
              `Etablissement ${paramId}`}{" "}
            | e-MJPM
          </title>
        </Helmet>
        <EtablissementViewForm data={etablissement} />
      </>
    );
  }
}

export default EtablissementView;
