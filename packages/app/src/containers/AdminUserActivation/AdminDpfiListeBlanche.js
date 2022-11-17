import { useMutation } from "@apollo/client";
import { Box, Flex, Text } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import useUser from "~/hooks/useUser";
import { Link } from "~/components/Link";
import { Button } from "~/components";

import { LISTE_BLANCHE_ASSOCIATION_DPFI as LISTE_BLANCHE_ASSOCIATION } from "./mutations";

function AdminDpfiListeBlanche(props) {
  const { liste_blanche, mandataire } = props;

  const user = useUser();
  const [updateMandataire, { loading, error }] = useMutation(
    LISTE_BLANCHE_ASSOCIATION
  );

  if (!useQueryReady(loading, error)) {
    return null;
  }

  async function handleClick() {
    try {
      await updateMandataire({
        refetchQueries: ["adminUserQuery"],
        variables: {
          liste_blanche_id: liste_blanche.id,
          mandataire_id: mandataire.id,
        },
      });
    } catch (err) {
      if (err.message.includes("Uniqueness violation")) {
        alert(
          `Oups, l'utilisateur ${liste_blanche.prenom} ${liste_blanche.nom} (liste_blanche_id: ${liste_blanche.id}) est déja associé à un autre mandataire (liste blanche).`
        );
      }
    }
  }

  return (
    <>
      {mandataire?.liste_blanche ? (
        <Link to={`/${user.type}/liste-blanche/${mandataire.liste_blanche.id}`}>
          <Text fontWeight="bold">{`${mandataire.liste_blanche.prenom} ${mandataire.liste_blanche.nom}`}</Text>
          <Text>{`${mandataire.liste_blanche.email}`}</Text>
          {mandataire.liste_blanche.siret && (
            <Text>{`SIRET: ${mandataire.liste_blanche.siret}`}</Text>
          )}
        </Link>
      ) : (
        <>
          {liste_blanche ? (
            <Flex>
              <Box>
                <Text fontWeight="bold">{`${liste_blanche.prenom} ${liste_blanche.nom}`}</Text>
                <Text>{`${liste_blanche.email}`}</Text>
              </Box>
              <Button onClick={handleClick}>Associer</Button>
            </Flex>
          ) : (
            <Box>
              <Text fontWeight="bold">
                {"Aucune correspondance dans la liste blanche."}
              </Text>
            </Box>
          )}
        </>
      )}
    </>
  );
}

export { AdminDpfiListeBlanche };
