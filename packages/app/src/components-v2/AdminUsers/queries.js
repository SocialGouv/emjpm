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
      order_by: { active: asc, id: desc }
      offset: $offset
      where: { nom: { _ilike: $searchText } }
    ) {
      id
      nom
      prenom
      type
      email
      active
      mandataire {
        adresse
        code_postal
        ville
      }
      magistrat {
        ti {
          ville
        }
      }
      user_tis(order_by: { ti: { ville: asc } }) {
        ti {
          ville
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
