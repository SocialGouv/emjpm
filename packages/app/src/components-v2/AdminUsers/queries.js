import gql from "graphql-tag";

export const USERS = gql`
  query services($limit: Int, $searchText: String, $offset: Int) {
    users_aggregate(where: { nom: { _ilike: $searchText } }) {
      aggregate {
        count
      }
    }
    users(
      limit: $limit
      order_by: { nom: asc }
      offset: $offset
      where: { nom: { _ilike: $searchText } }
    ) {
      id
      nom
      prenom
      type
      email
      mandataire {
        adresse
        code_postal
        ville
      }
      magistrat {
        ti {
          etablissement
        }
      }
      user_tis {
        ti {
          etablissement
        }
      }
      service_admins {
        service {
          etablissement
        }
      }
    }
  }
`;
