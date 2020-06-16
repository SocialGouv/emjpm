import { Button, Heading4 } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { FieldLabelValue, getLabel } from "../ServiceInformationCommon";

const ServiceInformationPersonnelView = (props) => {
  const { personnel, handleEdit } = props;
  return (
    <Fragment>
      <Box>
        <Heading4 pb={1}>{`Informations sur le personnel`}</Heading4>
        <FieldLabelValue
          value={getLabel(personnel.nombre_postes_delegues_etp)}
          label="Nombre de postes de délégués en ETP"
        />
        <FieldLabelValue value={getLabel(personnel.nombre_delegues)} label="Nombre de délégués" />
        <FieldLabelValue
          value={getLabel(personnel.nombre_poste_autre_personnel_etp)}
          label="Nombre de postes autres personnels en ETP"
        />
      </Box>
      <Box>
        <Heading4 pb={1}>{`Délégués formés`}</Heading4>
        <FieldLabelValue
          value={getLabel(personnel.nombre_delegues_cnc)}
          label="Nombre de délégués en poste et ayant CNC"
        />
        <FieldLabelValue
          value={getLabel(personnel.nombre_delegues_cnc_pjm)}
          label="Nombre de délégués en poste et ayant CNC PJM"
        />
        <FieldLabelValue
          value={getLabel(personnel.nombre_delegues_cnc_maj)}
          label="Nombre de délégués en poste et ayant CNC MAJ"
        />
        <FieldLabelValue
          value={getLabel(personnel.nombre_delegues_cnc_dpf)}
          label="Nombre de délégués en poste et ayant CNC DPF"
        />
      </Box>
      <Box>
        <Heading4 pb={1}>{`Délégués non formés ou en cours de formation`}</Heading4>
        <FieldLabelValue
          value={getLabel(personnel.nombre_delegues_en_formation)}
          label="Nombre de délégués en poste et en formation"
        />
        <FieldLabelValue
          value={getLabel(personnel.nombre_delegues_non_formes)}
          label="Nombre de délégués en poste ni formés, ni en formation"
        />
      </Box>
      <Flex mt="5">
        <Box>
          <Button onClick={handleEdit}>Modifier</Button>
        </Box>
      </Flex>
    </Fragment>
  );
};

export { ServiceInformationPersonnelView };
