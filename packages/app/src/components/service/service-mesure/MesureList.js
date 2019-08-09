import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";

export const mesuresQuery = gql`
  {
    mesures(order_by: { created_at: asc }, limit: 10) {
      id
    }
  }
`;

export default function MesureList() {
  return (
    <Query query={mesuresQuery}>
      {({ loading, error, data }) => {
        if (!data) return <div>No Data</div>;
        if (error) return <div>Error loading mesures</div>;
        if (loading) return <div>Loading</div>;

        return (
          <section>
            <ul>
              {data.mesures.map((mesure, index) => (
                <li key={mesure.id}>
                  <div>
                    <span>{index + 1}. </span>
                    <span>{mesure.id}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      }}
    </Query>
  );
}
