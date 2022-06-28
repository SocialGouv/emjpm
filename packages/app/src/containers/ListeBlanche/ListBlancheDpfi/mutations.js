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
