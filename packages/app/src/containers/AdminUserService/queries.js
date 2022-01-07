import gql from "graphql-tag";

export const USER_SERVICE = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
      service_members {
        id
        service {
          mesures_in_progress
          mesures_awaiting
          id
          ville
          code_postal
          adresse
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
