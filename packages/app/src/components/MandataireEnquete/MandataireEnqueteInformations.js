import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import React, { useContext } from "react";

import { PATH } from "../../constants/basePath";
import { isEmailExists } from "../../query-service/EmailQueryService";
import { isSiretExists } from "../../query-service/SiretQueryService";
import { UserContext } from "../UserContext";
import { MandataireEnqueteInformationsForm } from "./MandataireEnqueteInformationsForm";
import { MANDATAIRE } from "./queries";

export const MandataireEnqueteInformations = () => {
  const { id, type } = useContext(UserContext);

  const { data, error, loading } = useQuery(MANDATAIRE, {
    fetchPolicy: "network-only",
    variables: {
      userId: id
    }
  });

  const client = useApolloClient();

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const cancelLink = `${PATH[type]}/informations`;
  const user = data.users[0];
  const mandataire = user.mandataire;

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (values.siret != mandataire.siret && (await isSiretExists(client, values.siret))) {
      setErrors({
        siret: "Ce SIRET existe déjà"
      });
    } else if (values.email != user.email && (await isEmailExists(client, values.email))) {
      setErrors({
        email: "Cet email existe déjà"
      });
    } else {
      // TODO(remiroyc)
    }

    setSubmitting(false);
  };

  return (
    <Card p={3}>
      <MandataireEnqueteInformationsForm
        mandataire={mandataire}
        client={client}
        handleSubmit={handleSubmit}
        user={user}
        cancelLink={cancelLink}
      />
    </Card>
  );
};

export default MandataireEnqueteInformations;
