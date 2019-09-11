import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MesureList } from "@socialgouv/emjpm-ui-components";

import { MESURES } from "./queries";

const Link = props => {
  const { href, children } = props;
  return <a href={href}>{children}</a>;
};

const ServiceMesures = props => {
  const {
    currentUser: { user_antennes }
  } = props;
  const [mainAntenne] = user_antennes;

  const { data, error, loading } = useQuery(MESURES, {
    variables: {
      antenneId: mainAntenne.antenne_id
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const mesures = data.mesures.map(mesure => {
    const { type, ville, status, id, annee, civilite, date_ouverture, numero_rg } = mesure;
    return {
      age: annee ? annee : "nc",
      civilite: civilite ? civilite : "H",
      dateOuverture: date_ouverture ? date_ouverture : "non reseigné",
      href: `/services/mesure/${id}/`,
      id: id,
      numeroRg: numero_rg ? numero_rg : "RG-00000000",
      status: status ? status : "non reseigné",
      type: type ? type : "type de mesure non reseigné",
      ville: ville ? ville : "ville non reseigné"
    };
  });

  return (
    <MesureList
      LinkComponent={props => <Link {...props} />}
      validate={id => console.log(id)}
      mesures={mesures}
    />
  );
};

export { ServiceMesures };
