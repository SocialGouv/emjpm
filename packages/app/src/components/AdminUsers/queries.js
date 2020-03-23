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
    }
  }
`;

export const MESURES = gql`
  query mesures($userId: Int!) {
    mandataires(where: { id: { _eq: $userId } }) {
      mesures_en_attente
      mesures_en_cours
      id
    }
    mesures(where: { mandataire_id: { _eq: $userId } }) {
      id
      etablissement
      numero_dossier
      residence
      numero_rg
      status
      date_ouverture
      created_at
      ti {
        etablissement
        ville
      }
    }
  }
`;

export const USER_TIS = gql`
  query admin_user_tis($userId: Int!) {
    tis {
      id
      etablissement
      code_postal
    }
    user_tis(where: { user_id: { _eq: $userId } }) {
      id
      ti {
        id
        etablissement
        code_postal
      }
    }
  }
`;

export const MAGISTRAT = gql`
  query admin_magistrat($userId: Int!) {
    tis {
      id
      etablissement
      code_postal
    }
    magistrat(where: { user_id: { _eq: $userId } }) {
      id
      ti {
        id
        etablissement
        code_postal
      }
    }
  }
`;

export const USER = gql`
  query user($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      id
      nom
      prenom
      type
      email
      active
      magistrat {
        id
        ti {
          id
          ville
        }
      }
      user_tis(order_by: { ti: { ville: asc } }) {
        id
        ti {
          id
          ville
        }
      }
      service_members {
        id
        service {
          id
          etablissement
        }
      }
    }
  }
`;
