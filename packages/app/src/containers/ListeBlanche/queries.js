import gql from "graphql-tag";

export const LISTE_BLANCHE_BY_PK = gql`
  query listeBlancheUser($id: Int!) {
    liste_blanche_by_pk(id: $id) {
      id
      nom
      prenom
      email
      genre
      siret
      adresse
      adresse_complement
      code_postal
      telephone
      ville
      type
      mandataire {
        id
        adresse
        telephone
        siret
        user {
          id
          nom
          prenom
          email
          genre
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
      sdpf {
        id
        adresse
        siret
        etablissement
        code_postal
        created_at
        departement
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
        dpfi_departements {
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
