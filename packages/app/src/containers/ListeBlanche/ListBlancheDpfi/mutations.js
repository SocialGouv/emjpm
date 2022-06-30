import gql from "graphql-tag";

export const CREATE_LISTE_BLANCHE_DPFI = gql`
  mutation create_liste_blanche(
    $nom: String!
    $prenom: String!
    $genre: String
    $siret: String!
    $email: String!
    $telephone: String
    $adresse: String!
    $adresse_complement: String
    $code_postal: String!
    $ville: String!
    $departements: [dpfi_departements_insert_input!]!
  ) {
    insert_liste_blanche_one(
      object: {
        nom: $nom
        prenom: $prenom
        genre: $genre
        siret: $siret
        email: $email
        telephone: $telephone
        adresse: $adresse
        adresse_complement: $adresse_complement
        code_postal: $code_postal
        ville: $ville
        dpfi_departements: { data: $departements }
        type: "dpfi"
      }
    ) {
      created_at
      email
      id
      nom
      prenom
      siret
      type
    }
  }
`;

export const UPDATE_LISTE_BLANCHE = gql`
  mutation update_liste_blanche(
    $id: Int!
    $genre: String
    $nom: String
    $prenom: String
    $email: String
    $telephone: String
    $siret: String
    $adresse: String!
    $adresse_complement: String
    $code_postal: String!
    $ville: String!
    $departementsToDelete: [Int!]
    $departementsToAdd: [mandataire_individuel_departements_insert_input!]!
  ) {
    update_dpfi_departements(
      _set: { departement_financeur: false }
      where: { liste_blanche_id: { _eq: $id } }
    ) {
      affected_rows
    }
    delete_dpfi_departements(where: { id: { _in: $departementsToDelete } }) {
      affected_rows
    }
    insert_dpfi_departements(objects: $departementsToAdd) {
      affected_rows
    }
    update_liste_blanche_by_pk(
      pk_columns: { id: $id }
      _set: {
        genre: $genre
        nom: $nom
        prenom: $prenom
        email: $email
        telephone: $telephone
        siret: $siret
        adresse: $adresse
        adresse_complement: $adresse_complement
        code_postal: $code_postal
        ville: $ville
      }
    ) {
      id
      email
      nom
      prenom
      siret
      created_at
    }
  }
`;

export const UPDATE_DEPARTEMENT_FINANCEUR = gql`
  mutation set_departement_financeur($id: Int!) {
    update_dpfi_departements_by_pk(
      pk_columns: { id: $id }
      _set: { departement_financeur: true }
    ) {
      id
      departement_financeur
    }
  }
`;
