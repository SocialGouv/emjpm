import { useQuery } from "@apollo/react-hooks";
import { Heading2 } from "@emjpm/ui";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Box, Button, Flex } from "rebass";

import { Breadcrumb, LoadingWrapper } from "../Commons";
import { PaginatedList } from "../PaginatedList";
import { DirectionEnqueteReponseResumeCard } from "./DirectionEnqueteReponseResumeCard";
import { directionEnqueteReponseResumeBuilder } from "./enBuilder";
import { ENQUETE_DETAILS } from "./queries";

export const DirectionEnqueteDetailsReponsesList = ({ enqueteId }) => {
  const { data, loading, error } = useQuery(ENQUETE_DETAILS, {
    variables: { enqueteId },
  });

  const { enqueteLabel, enqueteReponseResumes } = useDirectionEnqueteDetailsReponsesList(data);

  const resultPerPage = 50;
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
            href: "/direction/enquetes/[enquete_id]",
            as: `/direction/enquetes/${enqueteId}`,
          },
          {
            label: "Toutes les réponses",
          },
        ]}
      />

      <Flex mt={4} px="1" alignItems="center" flexDirection="column" justifyContent="center">
        <Heading2>{"Réponses à l'enquête"}</Heading2>
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
    </LoadingWrapper>
  );
};
function useDirectionEnqueteDetailsReponsesList(data) {
  return useMemo(() => {
    if (data) {
      const enqueteReponses = data.enquete_reponses;
      const enquete = data.enquetes_by_pk;
      const enqueteLabel = `Enquête ${enquete.annee} sur l'activité de ${enquete.annee - 1}`;
      return {
        enqueteLabel,
        enqueteReponseResumes: directionEnqueteReponseResumeBuilder.buildMany(enqueteReponses),
      };
    }
    return {
      enqueteLabel: "",
      enqueteReponseResumes: [],
    };
  }, [data]);
}
