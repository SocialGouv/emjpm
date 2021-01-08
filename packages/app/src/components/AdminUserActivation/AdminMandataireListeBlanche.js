import { Fragment, useContext } from "react";
import { useMutation } from "@apollo/client";
import { Box, Flex, Text } from "rebass";

import { UserContext } from "~/components/UserContext";
import { Link } from "~/components/Link";
import { Button } from "~/ui";

import { LISTE_BLANCHE_ASSOCIATION } from "./mutations";

export const AdminMandataireListeBlanche = (props) => {
  const { lb_user, mandataire } = props;
  const user = useContext(UserContext);
  const [updateMandataire, { loading }] = useMutation(
    LISTE_BLANCHE_ASSOCIATION
  );

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  return (
    <Fragment>
      {mandataire.lb_user ? (
        <Link to={`/${user.type}/liste-blanche/${mandataire.lb_user.id}`}>
          <Text fontWeight="bold">{`${mandataire.lb_user.prenom} ${mandataire.lb_user.nom}`}</Text>
          <Text>{`${mandataire.lb_user.email}`}</Text>
          {mandataire.lb_user.siret && (
            <Text>{`SIRET: ${mandataire.lb_user.siret}`}</Text>
          )}
        </Link>
      ) : (
        <Fragment>
          {lb_user ? (
            <Flex>
              <Box>
                <Text fontWeight="bold">{`${lb_user.prenom} ${lb_user.nom}`}</Text>
                <Text>{`${lb_user.email}`}</Text>
              </Box>
              <Button
                onClick={async () => {
                  try {
                    await updateMandataire({
                      refetchQueries: ["adminUserQuery"],
                      variables: {
                        lb_user_id: lb_user.id,
                        mandataire_id: mandataire.id,
                      },
                    });
                  } catch (err) {
                    if (err.message.includes("Uniqueness violation")) {
                      alert(
                        `Oups, l'utilisateur ${lb_user.prenom} ${lb_user.nom} (lb_user_id: ${lb_user.id}) est déja associé à un autre mandataire (liste blanche).`
                      );
                    }
                  }
                }}
              >
                Associer
              </Button>
            </Flex>
          ) : (
            <Box>
              <Text fontWeight="bold">
                {"Aucune correspondance dans la liste blanche."}
              </Text>
            </Box>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AdminMandataireListeBlanche;
