import { useQuery } from "@apollo/client";
import useQueryReady from "~/hooks/useQueryReady";
import { Flex } from "rebass";
import { Heading, Text } from "~/components";
import {
  FormGrayBox,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";

import { SERVICE_ANTENNES } from "./queries";

function ServiceReservation(props) {
  const { serviceId, formik, schema } = props;

  const { data, error, loading } = useQuery(SERVICE_ANTENNES, {
    variables: {
      service_id: serviceId,
      departement_code: null,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { service_antenne } = data;
  const hasAntennes = service_antenne.length > 0;
  const antenneOptions = service_antenne.map((antenne) => ({
    label:
      antenne.name +
      " - " +
      antenne.code_postal +
      " " +
      antenne.ville +
      " - " +
      antenne.departement_code,
    value: antenne.id,
  }));

  return (
    <>
      {hasAntennes && (
        <Flex>
          <FormGrayBox>
            <Heading size={4}>Service mandataire</Heading>
            <Text lineHeight="1.5">
              {
                "Informations sur la prise en charge de la mesure par le service"
              }
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              id="antenne"
              options={antenneOptions}
              placeholder="Antenne"
              value={formik.values.antenne}
              formik={formik}
              validationSchema={schema}
            />
          </FormInputBox>
        </Flex>
      )}
    </>
  );
}

export default ServiceReservation;
