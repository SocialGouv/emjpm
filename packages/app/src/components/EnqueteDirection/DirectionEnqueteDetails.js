import { useQuery } from "@apollo/react-hooks";
import { Heading2 } from "@emjpm/ui";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Box, Button, Flex } from "rebass";

import useQueryContextWithHasuraRole from "../../hooks/useQueryContextWithHasuraRole";
import { Breadcrumb, LoadingWrapper } from "../Commons";
import { PaginatedList } from "../PaginatedList";
import { DirectionEnqueteDetailsInformationsClesIndicators } from "./DirectionEnqueteDetailsInformationsClesIndicators";
import { directionEnqueteReponseResumeBuilder } from "./directionEnqueteReponseResumeBuilder";
import { DirectionEnqueteReponseResumeCard } from "./DirectionEnqueteReponseResumeCard";
import { ENQUETE_DETAILS_RESUME } from "./queries";

export const DirectionEnqueteDetails = ({ enqueteId }) => {
  const queryContext = useQueryContextWithHasuraRole("direction_");
  const { data, loading, error } = useQuery(ENQUETE_DETAILS_RESUME, {
    variables: { enqueteId, limit: 5 },
    context: queryContext,
  });

  const directionEnqueteDetails = useDirectionEnqueteDetails(data);
  const { enqueteLabel, enqueteReponseResumes } = directionEnqueteDetails;

  const resultPerPage = 10;
  const [currentOffset, setCurrentOffset] = useState(0);

  return (
    <LoadingWrapper error={error} loading={loading} errorRedirect={{ url: "/direction/enquetes" }}>
      <Breadcrumb
        crumbs={[
          {
            label: "Enquêtes",
            href: "/direction/enquetes",
          },
          {
            label: enqueteLabel,
          },
        ]}
      />
      <Flex mt={4} px="1" alignItems="center" flexDirection="column" justifyContent="center">
        <Heading2>{enqueteLabel}</Heading2>
      </Flex>
      <Flex mt={3} flexDirection="row">
        <Heading2>Informations clés</Heading2>
      </Flex>
      <Box mt={2}>
        <DirectionEnqueteDetailsInformationsClesIndicators
          directionEnqueteDetails={directionEnqueteDetails}
        />
      </Box>
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
          renderActions={(enqueteReponseResume) => {
            if (enqueteReponseResume.enqueteReponse.status === "submitted") {
              return (
                <Box mt={1} textAlign="center">
                  <Link
                    href={`/direction/enquetes/[enquete_id]/reponse/[enquete_reponse_id]`}
                    as={`/direction/enquetes/${enqueteId}/reponse/${enqueteReponseResume.reponse_id}`}
                  >
                    <a>
                      <Button>Visualiser</Button>
                    </a>
                  </Link>
                </Box>
              );
            }
            return null;
          }}
        />
      </Box>
      <Box mt={2} textAlign="center">
        <Link
          href={`/direction/enquetes/[enquete_id]/reponses`}
          as={`/direction/enquetes/${enqueteId}/reponses`}
        >
          <a>
            <Button>Voir les réponses</Button>
          </a>
        </Link>
      </Box>
    </LoadingWrapper>
  );
};
function useDirectionEnqueteDetails(data) {
  return useMemo(() => {
    if (data) {
      const enqueteReponses = data.enquete_reponses;
      const enquete = data.enquetes_by_pk;
      const enqueteLabel = `Enquête ${enquete.annee} sur l'activité de ${enquete.annee - 1}`;
      return {
        enqueteLabel,
        enqueteReponseResumes: directionEnqueteReponseResumeBuilder.buildMany(enqueteReponses),
        destinatairesCount:
          data.mandataires_aggregate.mandataires.count + data.services_aggregate.services.count,
        enqueteReponsesCount: data.enquete_reponses_aggregate.enquete_reponses.count,
        daysBeforeClosing: enquete.date_fin
          ? differenceInDays(new Date(enquete.date_fin), new Date())
          : undefined,
      };
    }
    return {
      enqueteLabel: "",
      enqueteReponseResumes: [],
      destinatairesCount: 0,
      enqueteReponsesCount: 0,
      daysBeforeClosing: 0,
    };
  }, [data]);
}
