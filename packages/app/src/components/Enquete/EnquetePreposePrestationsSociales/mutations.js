import gql from "graphql-tag";

export const UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_TUTELLE = gql`
  mutation update_enquete_reponses_prestations_sociales_tutelle(
    $id: Int!
    $tutelle: jsonb!
  ) {
    update_enquete_reponses_prepose_prestations_sociales_by_pk(
      pk_columns: { id: $id }
      _set: { tutelle: $tutelle }
    ) {
      id
      tutelle
    }
  }
`;

export const UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_REPARTITION = gql`
  mutation update_enquete_reponses_prepose_prestations_sociales_repartition(
    $id: Int!
    $aah: Float
    $pch: Float
    $asi: Float
    $rsa: Float
    $als_apl: Float
    $aspa: Float
    $apa: Float
  ) {
    update_enquete_reponses_prepose_prestations_sociales_by_pk(
      pk_columns: { id: $id }
      _set: {
        aah: $aah
        pch: $pch
        asi: $asi
        rsa: $rsa
        als_apl: $als_apl
        aspa: $aspa
        apa: $apa
      }
    ) {
      id
      aah
      pch
      asi
      rsa
      als_apl
      aspa
      apa
    }
  }
`;

export const UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_CURATELLE_SIMPLE = gql`
  mutation update_enquete_reponses_prepose_prestations_sociales_curatelle_simple(
    $id: Int!
    $curatelle_simple: jsonb!
  ) {
    update_enquete_reponses_prepose_prestations_sociales_by_pk(
      pk_columns: { id: $id }
      _set: { curatelle_simple: $curatelle_simple }
    ) {
      id
      curatelle_simple
    }
  }
`;

export const UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_CURATELLE_RENFORCEE = gql`
  mutation update_enquete_reponses_prepose_prestations_sociales_curatelle_renforcee(
    $id: Int!
    $curatelle_renforcee: jsonb!
  ) {
    update_enquete_reponses_prepose_prestations_sociales_by_pk(
      pk_columns: { id: $id }
      _set: { curatelle_renforcee: $curatelle_renforcee }
    ) {
      id
      curatelle_renforcee
    }
  }
`;

export const UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_AUTRES_MESURES = gql`
  mutation update_enquete_reponses_prepose_prestations_sociales_autres_mesures(
    $id: Int!
    $sauvegarde_autres_mesures: jsonb!
  ) {
    update_enquete_reponses_prepose_prestations_sociales_by_pk(
      pk_columns: { id: $id }
      _set: { sauvegarde_autres_mesures: $sauvegarde_autres_mesures }
    ) {
      id
      sauvegarde_autres_mesures
    }
  }
`;

export const UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_MAJ = gql`
  mutation update_enquete_reponses_prepose_prestations_sociales_maj(
    $id: Int!
    $maj: jsonb!
  ) {
    update_enquete_reponses_prepose_prestations_sociales_by_pk(
      pk_columns: { id: $id }
      _set: { maj: $maj }
    ) {
      id
      maj
    }
  }
`;
