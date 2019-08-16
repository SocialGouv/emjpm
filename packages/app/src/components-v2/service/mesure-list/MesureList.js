import React from "react";
import { Query } from "react-apollo";
import { allMesures } from "../../../graphql/Queries";

export default function MesureList() {
  return (
    <Query query={allMesures}>
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
                    <span>{mesure.id} - </span>
                    <span>{mesure.ville}</span>
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
