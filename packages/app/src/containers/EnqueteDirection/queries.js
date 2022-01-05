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

export const ENQUETE_DETAILS_RESUME = gql`
  query enquete_details_resume($enqueteId: Int!, $limit: Int) {
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
      order_by: { submitted_at: desc, created_at: desc }
      limit: $limit
      where: { enquete_id: { _eq: $enqueteId } }
    ) {
      reponse_id: id
      status
      departement {
        id
        nom
      }
      submitted_at
      uploaded_on
      user_type
      mandataire {
        id
        user {
          id
          prenom
          nom
          type
        }
        ville
      }
      service {
        id
        etablissement
        ville
      }
    }
  }
`;

export const ENQUETE_DETAILS_LIST = gql`
  query ENQUETE_DETAILS_LIST(
    $enqueteId: Int!
    $offset: Int!
    $limit: Int!
    $departementCode: String
    $userType: String
    $status: enquete_reponse_status_enum
  ) {
    individuels_aggregate: mandataires_aggregate(
      where: {
        user: { type: { _eq: "individuel" } }
        departement_code: { _eq: $departementCode }
      }
    ) {
      mandataires: aggregate {
        count(columns: id)
      }
    }
    preposes_aggregate: mandataires_aggregate(
      where: {
        user: { type: { _eq: "prepose" } }
        departement_code: { _eq: $departementCode }
      }
    ) {
      mandataires: aggregate {
        count(columns: id)
      }
    }
    services_aggregate(where: { departement_code: { _eq: $departementCode } }) {
      services: aggregate {
        count(columns: id)
      }
    }
    enquete_draft_count: enquete_reponses_aggregate(
      where: {
        departement_code: { _eq: $departementCode }
        enquete_id: { _eq: $enqueteId }
        status: { _eq: draft }
      }
    ) {
      enquete_reponses: aggregate {
        count(columns: id)
      }
    }
    enquete_validated_count: enquete_reponses_aggregate(
      where: {
        departement_code: { _eq: $departementCode }
        enquete_id: { _eq: $enqueteId }
        status: { _eq: validated }
      }
    ) {
      enquete_reponses: aggregate {
        count(columns: id)
      }
    }
    enquete_submitted_count: enquete_reponses_aggregate(
      where: {
        departement_code: { _eq: $departementCode }
        enquete_id: { _eq: $enqueteId }
        status: { _eq: submitted }
      }
    ) {
      enquete_reponses: aggregate {
        count(columns: id)
      }
    }
    enquetes_by_pk(id: $enqueteId) {
      id
      created_at
      annee
      date_fin
      enquete_reponses_aggregate {
        aggregate {
          count
        }
      }
      enquete_reponses(
        limit: $limit
        offset: $offset
        where: {
          user_type: { _eq: $userType }
          status: { _eq: $status }
          departement_code: { _eq: $departementCode }
        }
        order_by: { submitted_at: desc, created_at: desc }
      ) {
        reponse_id: id
        status
        created_at
        submitted_at
        uploaded_on
        user_type
        departement {
          id
          nom
        }
        mandataire {
          id
          user {
            id
            prenom
            nom
            type
          }
          ville
        }
        service {
          id
          etablissement
          ville
        }
      }
    }
    mandataires_sans_reponse: mandataires(
      where: { _not: { enquete_reponses: { enquete_id: { _eq: $enqueteId } } } }
    ) {
      id
      user {
        id
        prenom
        nom
        type
      }
      liste_blanche {
        mandataire_individuel_departements {
          departement_financeur
          departement {
            nom
          }
        }
      }
      ville
    }
    services_sans_reponse: services(
      where: { _not: { enquete_reponses: { enquete_id: { _eq: $enqueteId } } } }
    ) {
      id
      etablissement
      departement {
        id
        nom
      }
      ville
    }
  }
`;
