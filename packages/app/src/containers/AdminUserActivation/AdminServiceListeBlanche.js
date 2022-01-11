import { Box, Text } from "rebass";
import { Link } from "~/components/Link";
import useUser from "~/hooks/useUser";

export function AdminServiceListeBlanche(props) {
  const { service } = props;
  const { liste_blanche } = service;

  const user = useUser();

  return (
    <>
      {liste_blanche ? (
        <Link to={`/${user.type}/liste-blanche/${liste_blanche.id}`}>
          <Text fontWeight="bold">{`${liste_blanche.prenom} ${liste_blanche.nom}`}</Text>
          <Text>{`${liste_blanche.email}`}</Text>
          {liste_blanche.siret && (
            <Text>{`SIRET: ${liste_blanche.siret}`}</Text>
          )}
        </Link>
      ) : (
        <Box>
          <Text fontWeight="bold">
            {"Aucune correspondance dans la liste blanche."}
          </Text>
        </Box>
      )}
    </>
  );
}

export default AdminServiceListeBlanche;
