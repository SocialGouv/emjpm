import { useQuery } from "@apollo/client";
import { differenceInDays } from "date-fns";

import { Box, Button, Flex } from "rebass";

import { Breadcrumb } from "~/containers/Commons";
import { Link } from "~/components/Link";
import { PaginatedList } from "~/containers/PaginatedList";
import useQueryContextWithHasuraRole from "~/hooks/useQueryContextWithHasuraRole";
import { Heading } from "~/components";

import { DirectionEnqueteDetailsInformationsClesIndicators } from "./DirectionEnqueteDetailsInformationsClesIndicators";
import { DirectionEnqueteReponseResumeCard } from "./DirectionEnqueteReponseResumeCard";
import useQueryReady from "~/hooks/useQueryReady";
import useOnErrorRedirect from "~/hooks/useOnErrorRedirect";
import {
  DirectionEnqueteReponsesCriteria,
  ENQUETE_REPONSE_STATUS_OPTIONS,
  useDirectionEnqueteReponsesCriteria,
} from "./DirectionEnqueteReponsesFilter";
import { ENQUETE_DETAILS_LIST } from "./queries";

const resultPerPage = 10;

function buildQueryVariables(enqueteId, criteria) {
  const variables = {
    enqueteId,
    limit: resultPerPage,
    offset: criteria.currentOffset,
  };
  if (
    criteria.selectedDepartement &&
    criteria.selectedDepartement.departement
  ) {
    variables.departementCode = criteria.selectedDepartement.departement.id;
  }

  if (criteria.responseStatus && criteria.responseStatus.value) {
    variables.status = criteria.responseStatus.value;
  }

  if (criteria.userType && criteria.userType.value) {
    variables.userType = criteria.userType.value;
  }
  return variables;
}

export function DirectionEnqueteDetailsReponsesList({ enqueteId }) {
  const queryContext = useQueryContextWithHasuraRole("direction_");

  const { criteria, updateCriteria } = useDirectionEnqueteReponsesCriteria({
    responseStatus: ENQUETE_REPONSE_STATUS_OPTIONS[0],
  });

  const { data, loading, error } = useQuery(ENQUETE_DETAILS_LIST, {
    context: queryContext,
    variables: buildQueryVariables(enqueteId, criteria),
  });

  const enqueteLabel =
    data && data.enquetes_by_pk
      ? `Enquête ${data.enquetes_by_pk.annee} sur l'activité de ${
          data.enquetes_by_pk.annee - 1
        }`
      : "";

  useOnErrorRedirect(error, "/direction/enquetes");
  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <div>
      <Breadcrumb
        crumbs={[
          {
            label: "Enquêtes",
            to: "/direction/enquetes",
          },
          {
            label: enqueteLabel,
            to: `/direction/enquetes/${enqueteId}`,
          },
        ]}
      />

      <Flex
        mt={4}
        px="1"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading size={2}>{enqueteLabel}</Heading>
      </Flex>

      <Flex mt={3} flexDirection="row">
        <Heading size={2}>Informations clés</Heading>
      </Flex>
      <Box mt={2}>
        {data && (
          <DirectionEnqueteDetailsInformationsClesIndicators
            preposesCount={data.preposes_aggregate.mandataires.count}
            individuelsCount={data.individuels_aggregate.mandataires.count}
            servicesCount={data.services_aggregate.services.count}
            enqueteDraftCount={data.enquete_draft_count.enquete_reponses.count}
            enqueteValidatedCount={
              data.enquete_validated_count.enquete_reponses.count
            }
            enqueteSubmittedCount={
              data.enquete_submitted_count.enquete_reponses.count
            }
            daysBeforeClosing={
              data.enquetes_by_pk && data.enquetes_by_pk.date_fin
                ? differenceInDays(
                    new Date(data.enquetes_by_pk.date_fin),
                    new Date()
                  )
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
        <Heading size={2}>{"Réponses à l'enquête"}</Heading>
      </Flex>

      <DirectionEnqueteReponsesCriteria
        criteria={criteria}
        updateCriteria={updateCriteria}
      />

      <Box mt={2}>
        <PaginatedList
          entries={
            data && data.enquetes_by_pk
              ? data.enquetes_by_pk.enquete_reponses
              : []
          }
          RowItem={DirectionEnqueteReponseResumeCard}
          count={
            data && data.enquetes_by_pk
              ? data.enquetes_by_pk.enquete_reponses_aggregate.aggregate.count
              : 0
          }
          resultPerPage={resultPerPage}
          currentOffset={criteria.currentOffset}
          setCurrentOffset={(value) => updateCriteria("currentOffset", value)}
          renderActions={(item) => {
            if (item.status === "submitted" || item.status === "validated") {
              return (
                <Box mt={1} textAlign="center">
                  <Link
                    to={`/direction/enquetes/${enqueteId}/reponse/${item.reponse_id}`}
                  >
                    <Button title="Visualiser" aria-label="Visualiser">
                      Visualiser
                    </Button>
                  </Link>
                </Box>
              );
            }
            return null;
          }}
        />
      </Box>
    </div>
  );
}
