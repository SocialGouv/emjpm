import gql from "graphql-tag";

export const UPDATE_LISTE_BLANCHE_PREPOSE = gql`
  mutation update_liste_blanche_prepose(
    $id: Int!
    $data: liste_blanche_set_input = {}
    $etablissements: [mandataire_prepose_etablissements_insert_input!]! = {}
  ) {
    delete_mandataire_prepose_etablissements(
      where: { liste_blanche_id: { _eq: $id } }
    ) {
      affected_rows
    }
    insert_mandataire_prepose_etablissements(objects: $etablissements) {
      affected_rows
      returning {
        id
        etablissement {
          id
          rslongue
          ligneacheminement
        }
        liste_blanche_id
        etablissement_id
        etablissement_rattachement
      }
    }
    update_liste_blanche_by_pk(pk_columns: { id: $id }, _set: $data) {
      id
      created_at
      email
      mandataire_prepose_etablissements {
        id
        etablissement_id
        liste_blanche_id
        etablissement {
          id
          rslongue
          ligneacheminement
        }
      }
      nom
      prenom
      siret
    }
  }
`;

export const CREATE_LISTE_BLANCHE_PREPOSE = gql`
  mutation create_liste_blanche_prepose(
    $email: String!
    $nom: String!
    $prenom: String!
    $etablissements: [mandataire_prepose_etablissements_insert_input!]! = {}
  ) {
    insert_liste_blanche_one(
      object: {
        email: $email
        nom: $nom
        prenom: $prenom
        mandataire_prepose_etablissements: { data: $etablissements }
        type: "prepose"
      }
    ) {
      email
      created_at
      id
      nom
      prenom
      siret
      mandataire_prepose_etablissements {
        etablissement_id
        etablissement_rattachement
        id
        liste_blanche_id
      }
    }
  }
`;
