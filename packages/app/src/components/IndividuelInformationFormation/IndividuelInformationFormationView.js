import { Button, Field, Heading4 } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import { content } from "./style";

const getLabel = (model, property) => {
  const res = model[property];
  if (!res) {
    return "non renseigné";
  }
  return res;
};

const FieldLabelValue = ({ label, value }) => (
  <Field>
    <Text lineHeight="1.5" color="textSecondary">
      {label}
    </Text>
    <Text lineHeight="1.5" sx={content}>
      {value}
    </Text>
  </Field>
);

const IndividuelInformationFormationView = props => {
  const { formation, handleEdit } = props;

  return (
    <Fragment>
      <Box>
        <Heading4 mb={1}>{"CNC MJPM"}</Heading4>
        <FieldLabelValue
          label="Année d'obtention du CNC MJPM"
          value={getLabel(formation, "cnc_mjpm_annee_obtention")}
        />
        <FieldLabelValue
          label="Nombre d'heures de formation dans le cadre du CNC MJPM (hors stage)"
          value={getLabel(formation, "cnc_mjpm_heure_formation")}
        />
      </Box>
      <Box>
        <Heading4 mb={1}>{"CNC MAJ"}</Heading4>
        <FieldLabelValue
          label="Année d'obtention du CNC MAJ"
          value={getLabel(formation, "cnc_maj_annee_obtention")}
        />

        {formation.cnc_mjpm_annee_obtention && (
          <FieldLabelValue
            label="Nombre d'heures de formation dans le cadre du CNC MAJ (hors stage)"
            value={getLabel(formation, "cnc_maj_heure_formation")}
          />
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"CNC DPF"}</Heading4>
        <FieldLabelValue
          label="Année d'obtention du CNC DPF"
          value={getLabel(formation, "cnc_dpf_annee_obtention")}
        />
        {formation.cnc_dpf_annee_obtention && (
          <FieldLabelValue
            label="Nombre d'heures de formation dans le cadre du CNC DPF"
            value={getLabel(formation, "cnc_dpf_heure_formation")}
          />
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Niveau de qualification"}</Heading4>
        <FieldLabelValue
          label="Niveau de qualification de 1 à 5"
          value={getLabel(formation, "niveau_qualification")}
        />

        <FieldLabelValue
          label="Niveau de qualification du secrétaire spécialisé de 1 à 5"
          value={getLabel(formation, "niveau_qualification_secretaire_spe")}
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

export { IndividuelInformationFormationView };
