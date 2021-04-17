import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import useQueryReady from "~/hooks/useQueryReady";

import { departementList } from "~/utils/geodata";
import { useMemo } from "react";

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
function getLast12MonthDates() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const months = [];
  for (let i = 0; i < 12; i++) {
    const dateStart = new Date();
    dateStart.setMonth(dateStart.getMonth() - i);
    dateStart.setDate(1);

    const dateEnd = new Date();
    dateEnd.setMonth(dateEnd.getMonth() - i + 1);
    dateEnd.setDate(0);
    months.push([dateStart, dateEnd]);
  }
  return months;
}

function IndicatorYear() {
  const months = getLast12MonthDates().reverse();

  const queryParts = [];
  const queryVarsParts = [];
  const variables = useMemo(() => ({}), []);
  for (const month of months) {
    const [monthStart, monthEnd] = month;
    const monthN = monthStart.getMonth();
    queryVarsParts.push("$month_" + monthN + "_start: timestamptz!");
    queryVarsParts.push("$month_" + monthN + "_end: timestamptz!");
    for (const departement of departementList) {
      variables["month_" + monthN + "_start"] = monthStart;
      variables["month_" + monthN + "_end"] = monthEnd;
      queryParts.push(`
        mesures_count_${monthN}_${departement.code}: mesures_aggregate(
          where: {
            _and: {
              created_at: { _gte: $month_${monthN}_start, _lte: $month_${monthN}_end }
              magistrat_id: { _is_null: false }
              departement: { id: { _eq: "${departement.code}" } }
            }
          }
        ) {
          aggregate { count }
        }
      `);
    }
  }

  const query = useMemo(
    () => gql`
    query Indicators(
      ${queryVarsParts.join(",\n")}
    ) {
      ${queryParts.join("\n")}
    }
  `,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // console.log(`
  //   query Indicators(
  //     ${queryVarsParts.join(",\n")}
  //   ) {
  //     ${queryParts.join("\n")}
  //   }
  // `);
  // console.log(JSON.stringify(variables));

  // return null;
  const { data, error, loading } = useQuery(query, {
    context: { headers: { "X-Hasura-Role": "anonymous" } },
    variables,
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const results = {};
  for (const month of months) {
    const [monthStart] = month;
    const monthN = monthStart.getMonth();
    results[monthN] = {};
    for (const departement of departementList) {
      results[monthN][departement.code] =
        data[`mesures_count_${monthN}_${departement.code}`].aggregate.count;
    }
  }

  const csv = [["departement"]];
  for (const month of months) {
    const [monthStart] = month;
    const monthN = monthStart.getMonth();
    csv[0].push(monthNames[monthN]);
  }
  let lineN = 1;
  for (const departement of departementList) {
    csv[lineN] = [departement.code];
    for (const month of months) {
      const [monthStart] = month;
      const monthN = monthStart.getMonth();
      csv[lineN].push(results[monthN][departement.code]);
    }
    lineN++;
  }
  const csvLines = csv.map((line) => line.join(";"));

  return <pre>{csvLines.join("\n")}</pre>;
}

export { IndicatorYear };
