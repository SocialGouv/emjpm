import { useQuery } from "@apollo/react-hooks";
import { Heading2 } from "@emjpm/ui";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import { Box, Button, Flex } from "rebass";

import useQueryContextWithHasuraRole from "../../hooks/useQueryContextWithHasuraRole";
import { Breadcrumb, LoadingWrapper } from "../Commons";
import { PaginatedList } from "../PaginatedList";
import { DirectionEnqueteDetailsInformationsClesIndicators } from "./DirectionEnqueteDetailsInformationsClesIndicators";
import { directionEnqueteReponseResumeBuilder } from "./directionEnqueteReponseResumeBuilder";
import { DirectionEnqueteReponseResumeCard } from "./DirectionEnqueteReponseResumeCard";
import {
  DirectionEnqueteReponsesCriteria,
  ENQUETE_REPONSE_STATUS_OPTIONS,
  enqueteReponseResumesFilter,
  useDirectionEnqueteReponsesCriteria,
} from "./DirectionEnqueteReponsesFilter";
import { ENQUETE_DETAILS_LIST } from "./queries";

export const DirectionEnqueteDetailsReponsesList = ({ enqueteId }) => {
  const queryContext = useQueryContextWithHasuraRole("direction_");

  const { data, loading, error } = useQuery(ENQUETE_DETAILS_LIST, {
    variables: { enqueteId },
    context: queryContext,
  });

  const { enqueteLabel, enqueteReponseResumes } = useDirectionEnqueteDetailsReponsesList(data);
  const resultPerPage = 10;

  const { criteria, updateCriteria } = useDirectionEnqueteReponsesCriteria({
    responseStatus: ENQUETE_REPONSE_STATUS_OPTIONS[0],
  });

  const setCurrentOffset = useCallback(
    (value) => {
      updateCriteria("currentOffset", value);
    },
    [updateCriteria]
  );

  const enqueteReponseResumesIndex = useMemo(
    () => enqueteReponseResumesFilter.buildIndex(enqueteReponseResumes),
    [enqueteReponseResumes]
  );

  const filteredEnqueteReponseResumes = useMemo(
    () =>
      enqueteReponseResumesFilter.filter({
        enqueteReponseResumesIndex,
        enqueteReponseResumes,
        criteria,
      }),
    [criteria, enqueteReponseResumes, enqueteReponseResumesIndex]
  );

  const currentPageEntries = useMemo(() => {
    const start = criteria.currentOffset;
    const end = start + resultPerPage;
    const items = filteredEnqueteReponseResumes.slice(start, end);
    return items;
  }, [criteria.currentOffset, filteredEnqueteReponseResumes]);

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
            href: "/direction/enquetes/[enquete_id]",
            as: `/direction/enquetes/${enqueteId}`,
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
        {data && (
          <DirectionEnqueteDetailsInformationsClesIndicators
            destinatairesCount={
              data.mandataires_aggregate.mandataires.count + data.services_aggregate.services.count
            }
            enqueteDraftCount={data.enquete_draft_count.enquete_reponses.count}
            enqueteSubmittedCount={data.enquete_submitted_count.enquete_reponses.count}
            daysBeforeClosing={
              data.enquetes_by_pk && data.enquetes_by_pk.date_fin
                ? differenceInDays(new Date(data.enquetes_by_pk.date_fin), new Date())
                : undefined
            }
          />
        )}
      </Box>

      <Flex
        mb={4}
        mt={"50px"}
        px="1"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading2>{`Réponses à l'enquête`}</Heading2>
      </Flex>

      <DirectionEnqueteReponsesCriteria criteria={criteria} updateCriteria={updateCriteria} />

      <Box mt={2}>
        <PaginatedList
          entries={currentPageEntries}
          RowItem={DirectionEnqueteReponseResumeCard}
          count={filteredEnqueteReponseResumes.length}
          resultPerPage={resultPerPage}
          currentOffset={criteria.currentOffset}
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
    </LoadingWrapper>
  );
};

function useDirectionEnqueteDetailsReponsesList(data) {
  return useMemo(() => {
    if (data) {
      const enqueteReponses = data.enquete_reponses;
      const enquete = data.enquetes_by_pk;
      const enqueteLabel = `Enquête ${enquete.annee} sur l'activité de ${enquete.annee - 1}`;
      const resumes = directionEnqueteReponseResumeBuilder.buildMany(enqueteReponses);
      const resumes_mandataires_sans_reponse = directionEnqueteReponseResumeBuilder.buildManyFromMandatairesSansReponse(
        data.mandataires_sans_reponse
      );
      const resumes_services_sans_reponse = directionEnqueteReponseResumeBuilder.buildManyFromServicesSansReponse(
        data.services_sans_reponse
      );

      const enqueteReponseResumes = resumes
        .concat(resumes_mandataires_sans_reponse)
        .concat(resumes_services_sans_reponse);

      enqueteReponseResumes.sort(function (a, b) {
        if (a.sortName < b.sortName) {
          return -1;
        }
        if (a.sortName > b.sortName) {
          return 1;
        }
        return a.uniqueId - b.uniqueId;
      });

      return {
        enqueteLabel,
        enqueteReponseResumes,
        counts: {
          responses: resumes.length,
          all: enqueteReponseResumes.length,
        },
      };
    }
    return {
      enqueteLabel: "",
      enqueteReponseResumes: [],
      counts: {
        responses: 0,
        all: 0,
      },
    };
  }, [data]);
}
