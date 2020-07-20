import gql from "graphql-tag";

export const USERS = gql`
  query services($limit: Int, $searchText: String, $offset: Int, $type: String) {
    users_aggregate(
      where: {
        type: { _eq: $type }
        _or: [{ email: { _ilike: $searchText } }, { nom: { _ilike: $searchText } }]
      }
    ) {
      aggregate {
        count
      }
    }
    users(
      limit: $limit
      order_by: { active: asc, id: desc }
      offset: $offset
      where: {
        type: { _eq: $type }
        _or: [{ email: { _ilike: $searchText } }, { nom: { _ilike: $searchText } }]
      }
    ) {
      id
      nom
      prenom
      type
      email
      active
      mandataire {
        lb_user_id
      }
    }
  }
`;

export const MESURES = gql`
  query mesures($userId: Int!) {
    mandataires(where: { user_id: { _eq: $userId } }) {
      mesures_en_attente
      mesures_en_cours
      id
    }
    mesures(where: { mandataire: { user_id: { _eq: $userId } } }) {
      id
      etablissement
      annee_naissance
      nature_mesure
      champ_mesure
      numero_dossier
      lieu_vie
      numero_rg
      status
      date_nomination
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
    tis(where: { immutable: { _eq: true } }) {
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
    tis(where: { immutable: { _eq: true } }) {
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
  query user($userId: Int!) {
    directionRoles: role(where: { name: { _like: "direction%" } }) {
      id
      name
    }
    departements {
      code
      nom
      id
    }
    regions {
      nom
      id
    }
    users_by_pk(id: $userId) {
      user_roles {
        role {
          name
          id
        }
      }
      directions {
        id
        region_id
        department_id
        type
      }
      id
      nom
      prenom
      type
      email
      active
      mandataire {
        siret
      }
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
