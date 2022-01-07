import gql from "graphql-tag";

export const DELETE_mandataire_individuel_departements = gql`
  mutation delete_mandataire_individuel_departements($ids: [Int!]!) {
    delete_mandataire_individuel_departements(where: { id: { _in: $ids } }) {
      affected_rows
    }
  }
`;

export const UPDATE_DEPARTEMENT_FINANCEUR = gql`
  mutation set_departement_financeur($id: Int!) {
    update_mandataire_individuel_departements_by_pk(
      pk_columns: { id: $id }
      _set: { departement_financeur: true }
    ) {
      id
      departement_financeur
    }
  }
`;

export const CREATE_LISTE_BLANCHE_INDIVIDUEL = gql`
  mutation create_liste_blanche(
    $nom: String!
    $prenom: String!
    $siret: String!
    $email: String!
    $telephone: String!
    $adresse: String!
    $adresse_complement: String
    $code_postal: String!
    $ville: String!
    $departements: [mandataire_individuel_departements_insert_input!]!
  ) {
    insert_liste_blanche_one(
      object: {
        nom: $nom
        prenom: $prenom
        siret: $siret
        email: $email
        telephone: $telephone
        adresse: $adresse
        adresse_complement: $adresse_complement
        code_postal: $code_postal
        ville: $ville
        mandataire_individuel_departements: { data: $departements }
        type: "individuel"
      }
    ) {
      created_at
      email
      id
      mandataire_individuel_departements {
        id
        departement_code
      }
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
    update_mandataire_individuel_departements(
      _set: { departement_financeur: false }
      where: { liste_blanche_id: { _eq: $id } }
    ) {
      affected_rows
    }
    delete_mandataire_individuel_departements(
      where: { id: { _in: $departementsToDelete } }
    ) {
      affected_rows
    }
    insert_mandataire_individuel_departements(objects: $departementsToAdd) {
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

export const CREATE_LB_DEPARTEMENT = gql`
  mutation create_lb_departement(
    $liste_blanche_id: Int!
    $departement_code: String!
    $departement_financeur: Boolean
    $individuel: Boolean
    $service: Boolean
    $prepose: Boolean
    $ti: Boolean
  ) {
    insert_mandataire_individuel_departements_one(
      object: {
        liste_blanche_id: $liste_blanche_id
        departement_code: $departement_code
        departement_financeur: $departement_financeur
        individuel: $individuel
        service: $service
        prepose: $prepose
        ti: $ti
      }
    ) {
      id
    }
  }
`;

export const UPDATE_LB_DEPARTEMENT = gql`
  mutation update_lb_departement($id: Int!, $departement_financeur: Boolean) {
    update_mandataire_individuel_departements(
      where: { id: { _eq: $id } }
      _set: { departement_financeur: $departement_financeur }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_LB_DEPARTEMENT = gql`
  mutation delete_lb_departement($id: Int!) {
    delete_mandataire_individuel_departements_by_pk(id: $id) {
      id
    }
  }
`;
