import gql from "graphql-tag";

export const USERS = gql`
  query allUsers(
    $limit: Int
    $searchText: String
    $offset: Int
    $type: String
  ) {
    users_aggregate(
      where: {
        type: { _eq: $type }
        _or: [
          { email: { _ilike: $searchText } }
          { nom: { _ilike: $searchText } }
        ]
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
        _or: [
          { email: { _ilike: $searchText } }
          { nom: { _ilike: $searchText } }
        ]
      }
    ) {
      id
      nom
      prenom
      type
      email
      active
      directions {
        id
        type
        departement {
          id
          nom
        }
        region {
          id
          nom
        }
      }
      mandataire {
        id
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
      annee_naissance
      nature_mesure
      champ_mesure
      numero_dossier
      lieu_vie
      numero_rg
      status
      date_nomination
      code_postal
      ville
      created_at
      ti {
        id
        etablissement
        ville
      }
    }
  }
`;

export const MANDATAIRE_TIS = gql`
  query admin_mandataire_tis($userId: Int!) {
    tis(where: { immutable: { _eq: true } }) {
      id
      etablissement
      code_postal
    }
    mandataires(limit: 1, where: { user_id: { _eq: $userId } }) {
      id
    }
    mandataire_tis(where: { mandataire: { user_id: { _eq: $userId } } }) {
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

export const LB_USER = gql`
  query lb_user($where: lb_users_bool_exp!) {
    lb_users(where: $where) {
      id
      email
      nom
      prenom
      lb_departements {
        id
        departement_financeur
        departement {
          id
          code
        }
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
      id
      code
      nom
    }
    regions {
      nom
      id
    }
    users_by_pk(id: $userId) {
      id
      user_roles {
        id
        role {
          id
          name
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
        id
        siret
        lb_user_id
        lb_user {
          id
          nom
          prenom
          email
          siret
        }
        mandataire_tis(order_by: { ti: { ville: asc } }) {
          id
          ti {
            id
            ville
          }
        }
      }
      magistrat {
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
