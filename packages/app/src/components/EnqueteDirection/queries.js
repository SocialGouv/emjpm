import gql from "graphql-tag";

export const ENQUETES = gql`
  query enquetes {
    enquetes {
      created_at
      id
      status
      annee
      date_fin
    }
  }
`;

export const ENQUETE_DETAILS = gql`
  query enquete_details($enqueteId: Int!, $limit: Int) {
    enquetes_by_pk(id: $enqueteId) {
      id
      created_at
      annee
      date_fin
    }
    mandataires_aggregate {
      mandataires: aggregate {
        count(columns: id)
      }
    }
    services_aggregate {
      services: aggregate {
        count(columns: id)
      }
    }
    enquete_reponses_aggregate(where: { enquete_id: { _eq: $enqueteId } }) {
      enquete_reponses: aggregate {
        count(columns: id)
      }
    }
    enquete_reponses(
      order_by: { submitted_at: asc, created_at: asc }
      limit: $limit
      where: { enquete_id: { _eq: $enqueteId } }
    ) {
      reponse_id: id
      status
      submitted_at
      user_type
      mandataire {
        id
        user {
          id
          prenom
          nom
          type
        }
        departement {
          code
          nom
        }
        ville
      }
      service {
        id
        etablissement
        departement {
          code
          nom
        }
        ville
      }
    }
  }
`;
