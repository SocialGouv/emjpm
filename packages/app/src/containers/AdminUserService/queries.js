import gql from "graphql-tag";

export const USER_SERVICE = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
      genre
      service_members {
        id
        service {
          mesures_in_progress
          mesures_awaiting
          id
          adresse
          adresse_complement
          use_location_adresse
          ville
          code_postal
          location_adresse
          latitude
          longitude
          email
          etablissement
          dispo_max
          telephone
          prenom
          nom
          competences
          created_at
          suspend_activity
          suspend_activity_reason
          service_antennes_aggregate {
            aggregate {
              count
              sum {
                mesures_max
              }
            }
          }
          departements {
            id
            tis(where: { immutable: { _eq: true } }) {
              id
              etablissement
            }
          }
          service_tis {
            id
            ti {
              etablissement
              id
            }
          }
        }
      }
    }
  }
`;
