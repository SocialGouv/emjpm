import { useQuery } from "@apollo/react-hooks";
import { Heading2 } from "@emjpm/ui";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Box, Button, Flex } from "rebass";

import { Breadcrumb, LoadingWrapper } from "../Commons";
import { PaginatedList } from "../PaginatedList";
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
  const { data, loading, error } = useQuery(ENQUETE_DETAILS_LIST, {
    variables: { enqueteId },
  });

  const { enqueteLabel, counts, enqueteReponseResumes } = useDirectionEnqueteDetailsReponsesList(
    data
  );

  const resultPerPage = 10;
  const [currentOffset, setCurrentOffset] = useState(0);

  const { criteria, updateCriteria } = useDirectionEnqueteReponsesCriteria({
    responseStatus: ENQUETE_REPONSE_STATUS_OPTIONS[0],
  });

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
    const start = currentOffset;
    const end = start + resultPerPage;
    const items = filteredEnqueteReponseResumes.slice(start, end);
    return items;
  }, [currentOffset, filteredEnqueteReponseResumes]);

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
          {
            label: "Toutes les réponses",
          },
        ]}
      />

      <Flex mb={4} mt={4} px="1" alignItems="center" flexDirection="column" justifyContent="center">
        <Heading2>{`Réponses à l'enquête (${counts.responses}/${counts.all})`}</Heading2>
      </Flex>

      <DirectionEnqueteReponsesCriteria criteria={criteria} updateCriteria={updateCriteria} />

      <Box mt={2}>
        <PaginatedList
          entries={currentPageEntries}
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
