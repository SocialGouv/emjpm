import { useQuery } from "@apollo/react-hooks";
import { FlexWrapper, fourColumnStyle, Heading2, Indicator } from "@emjpm/ui";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Box, Button, Flex, Text } from "rebass";

import { LoadingWrapper } from "../Commons";
import { PaginatedList } from "../PaginatedList";
import { DirectionEnqueteReponseResumeCard } from "./DirectionEnqueteReponseResumeCard";
import { ENQUETE_DETAILS } from "./queries";

export const DirectionEnqueteDetails = ({ enqueteId }) => {
  const { data, loading, error } = useQuery(ENQUETE_DETAILS, {
    variables: { enqueteId, limit: 5 },
  });

  console.log("xxx data:", data);

  const {
    enquete,
    enqueteReponseResumes,
    destinatairesCount,
    enqueteReponsesCount,
    daysBeforeClosing,
  } = useMemo(() => {
    if (data) {
      const enqueteReponses = data.enquete_reponses;
      const enquete = data.enquetes_by_pk;
      return {
        enquete,
        enqueteReponseResumes: enqueteReponses.map((enqueteReponse) => ({
          reponse_id: enqueteReponse.reponse_id,
          submitted_at: enqueteReponse.submitted_at,
          status: enqueteReponse.status,
          user: enqueteReponse.mandataire?.user,
          departement: enqueteReponse.mandataire?.departement,
          ville: enqueteReponse.mandataire?.ville,
        })),
        destinatairesCount:
          data.mandataires_aggregate.mandataires.count + data.services_aggregate.services.count,
        enqueteReponsesCount: data.enquete_reponses_aggregate.enquete_reponses.count,
        daysBeforeClosing: enquete.date_fin
          ? differenceInDays(new Date(enquete.date_fin), new Date())
          : undefined,
      };
    }
    return {};
  }, [data]);

  const enqueteLabel = useMemo(
    () => `Enquête ${enquete.annee} sur l'activité de ${enquete.annee - 1}`,
    [enquete.annee]
  );

  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);

  return (
    <LoadingWrapper error={error} loading={loading} errorRedirect={{ url: "/direction/enquetes" }}>
      <Box>
        <Flex>
          <Link href="/direction/enquetes">
            <a>Enquêtes</a>
          </Link>
          <Text fontWeight="bold" color="primary">
            &nbsp;&gt;&nbsp;{enqueteLabel}
          </Text>
        </Flex>
        <Flex mt={4} px="1" alignItems="center" flexDirection="column" justifyContent="center">
          <Heading2>{enqueteLabel}</Heading2>
        </Flex>
        <Flex mt={3} flexDirection="row">
          <Heading2>Informations clés</Heading2>
        </Flex>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <Box sx={fourColumnStyle}>
            <Indicator title="Destinataires" indicator={destinatairesCount} />
          </Box>
          <Box sx={fourColumnStyle}>
            <Indicator title="Réponses envoyées" indicator={enqueteReponsesCount} />
          </Box>
          {daysBeforeClosing !== undefined && (
            <Box sx={fourColumnStyle}>
              {daysBeforeClosing >= 0 ? (
                <Indicator title="Jours avant cloture" indicator={daysBeforeClosing} />
              ) : (
                <Indicator title="Jours depuis la cloture" indicator={-daysBeforeClosing} />
              )}
            </Box>
          )}
        </FlexWrapper>
        <Flex mt={3} flexDirection="row">
          <Heading2>Dernières réponses</Heading2>
        </Flex>

        <Box mt={2}>
          <PaginatedList
            entries={enqueteReponseResumes}
            RowItem={DirectionEnqueteReponseResumeCard}
            count={enqueteReponseResumes.length}
            resultPerPage={resultPerPage}
            currentOffset={currentOffset}
            setCurrentOffset={setCurrentOffset}
          />
        </Box>
        <Flex
          sx={{
            width: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: "auto",
            justifyContent: "flex-end",
          }}
        >
          <Link
            href={`/direction/enquetes/[enquete_id]/reponses`}
            as={`/direction/enquetes/${enqueteId}/reponses`}
          >
            <a>
              <Button>Voir les réponses</Button>
            </a>
          </Link>
        </Flex>
      </Box>
    </LoadingWrapper>
  );
};
