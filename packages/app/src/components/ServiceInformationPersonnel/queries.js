import gql from "graphql-tag";

export const SERVICE_PERSONNEL = gql`
  query ServicePeronnel($service_id: Int) {
    service_personnels(where: { service_id: { _eq: $service_id } }) {
      id
      nombre_postes_delegues_etp
      nombre_delegues
      nombre_poste_autre_personnel_etp
      nombre_delegues_cnc
      nombre_delegues_cnc_pjm
      nombre_delegues_cnc_maj
      nombre_delegues_cnc_dpf
      nombre_delegues_en_formation
      nombre_delegues_non_formes
    }
  }
`;
