import gql from "graphql-tag";

export const LISTE_BLANCHE = gql`
  query liste_blanche_users(
    $limit: Int
    $offset: Int
    $filters: liste_blanche_bool_exp = {}
    $search: String
  ) {
    liste_blanche_aggregate: search_liste_blanche_aggregate(
      where: $filters
      args: { search: $search }
    ) {
      aggregate {
        count
      }
    }
    liste_blanche: search_liste_blanche(
      limit: $limit
      offset: $offset
      args: { search: $search }
      where: $filters
      order_by: { nom: asc_nulls_last }
    ) {
      id
      nom
      prenom
      email
      siret
      type
      mandataire {
        id
        user {
          id
          nom
          prenom
        }
      }
      mandataire_prepose_etablissements {
        etablissement {
          id
          rslongue
          departement {
            id
            nom
          }
        }
        etablissement_rattachement
      }
      mandataire_individuel_departements {
        id
        departement_financeur
        departement {
          id
          nom
        }
      }
    }
  }
`;

export const LISTE_BLANCHE_BY_PK = gql`
  query listeBlancheUser($id: Int!) {
    liste_blanche_by_pk(id: $id) {
      id
      nom
      prenom
      email
      siret
      adresse
      adresse_complement
      code_postal
      ville
      type
      mandataire {
        id
        user {
          id
          nom
          prenom
        }
      }
      mandataire_prepose_etablissements {
        id
        etablissement {
          id
          rslongue
          ligneacheminement
        }
        liste_blanche_id
        etablissement_rattachement
      }
      mandataire_individuel_departements {
        id
        departement_code
        departement_financeur
        departement {
          id
          nom
        }
      }
    }
  }
`;

export const SEARCH_VIEW_LB = gql`
  query search_view_lb(
    $limit: Int
    $offset: Int
    $filters: view_lb_bool_exp = {}
    $search: String
  ) {
    search_view_lb_aggregate(where: $filters, args: { search: $search }) {
      aggregate {
        count
      }
    }
    search_view_lb(
      limit: $limit
      offset: $offset
      args: { search: $search }
      where: $filters
      order_by: { nom: asc_nulls_last }
    ) {
      nom
      email
      siret
      type: user_type
      service {
        id
        adresse
        siret
        etablissement
        code_postal
        created_at
        departements {
          departement {
            id
            nom
          }
        }
        nom
        telephone
      }
      liste_blanche {
        id
        nom
        prenom
        mandataire {
          id
          user {
            id
            nom
            prenom
          }
        }
        mandataire_prepose_etablissements {
          etablissement {
            id
            rslongue
            departement {
              id
              nom
            }
          }
          etablissement_rattachement
        }
        mandataire_individuel_departements {
          id
          departement_financeur
          departement {
            id
            nom
          }
        }
      }
    }
  }
`;
