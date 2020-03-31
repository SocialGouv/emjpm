import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Text } from "@emjpm/ui";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { PATH } from "../../constants/basePath";
import { getLocation } from "../../query-service/DepartementQueryService";
import { isEmailExists } from "../../query-service/EmailQueryService";
import { isSiretExists } from "../../query-service/SiretQueryService";
import { UserContext } from "../UserContext";
import { MandataireEditInformationsForm } from "./MandataireEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { MANDATAIRE } from "./queries";
import { grayBox } from "./style";

const MandataireEditInformations = props => {
  const { id, type } = useContext(UserContext);

  const { data, error, loading } = useQuery(MANDATAIRE, {
    fetchPolicy: "network-only",
    variables: {
      userId: id
    }
  });

  const [editUser] = useMutation(EDIT_USER, {
    update() {
      Router.push(`${PATH[type]}/informations`, `${PATH[type]}/informations`, {
        shallow: true
      });
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
    const location = await getLocation(client, { zipcode: values.zipcode, city: values.city });

    if (!location || !location.department) {
      setErrors({
        code_postal: "Merci de renseigner un code postal valide"
      });
    }

    const { department, geolocation } = location;

    if (values.siret != mandataire.siret && (await isSiretExists(client, values.siret))) {
      setErrors({
        siret: "Ce SIRET existe déjà"
      });
    } else if (values.email != user.email && (await isEmailExists(client, values.email))) {
      setErrors({
        email: "Cet email existe déjà"
      });
    } else {
      editUser({
        refetchQueries: ["users"],
        variables: {
          id: user.id,
          nom: values.nom,
          prenom: values.prenom,
          email: values.email,
          adresse: values.address,
          code_postal: values.zipcode,
          department_id: department.id,
          dispo_max: parseInt(values.dispo_max),
          genre: values.genre.value,
          siret: values.siret,
          telephone: values.telephone,
          telephone_portable: values.telephone_portable,
          ville: values.city,
          latitude: geolocation ? geolocation.latitude : null,
          longitude: geolocation ? geolocation.longitude : null,
          competences: values.competences
        }
      });
    }

    setSubmitting(false);
  };

  return (
    <Card mt="5" p="0">
      <Flex {...props}>
        <Box width={[1, 2 / 5]} sx={grayBox}>
          <Box height="220px">
            <Heading4>{`Modifier vos informations`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Vos informations`}
            </Text>
          </Box>
          <Box height="80px">
            <Heading4>{`Civilité`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre civilité`}
            </Text>
          </Box>
          <Box height="210px">
            <Heading4>{`Informations professionelles`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre SIRET sera utilisé pour vous identifier en cas d'échanges de données avec
                d'autres systèmes (OCMI par exemple)`}
            </Text>
          </Box>
          <Box height="80px">
            <Heading4>{`Adresse professionelle`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`L'adresse de votre siège social`}
            </Text>
          </Box>
          <Box height="80px">
            <Heading4>{`Activité`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Informations relatives à votre activité`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <MandataireEditInformationsForm
              mandataire={mandataire}
              client={client}
              handleSubmit={handleSubmit}
              user={user}
              cancelLink={cancelLink}
            />
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { MandataireEditInformations };
