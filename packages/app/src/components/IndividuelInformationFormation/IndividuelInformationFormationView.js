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

const FieldLabel = ({ label }) => {
  return (
    <Text lineHeight="1.5" color="textSecondary">
      {label}
    </Text>
  );
};
const FieldValue = ({ value }) => {
  return (
    <Text lineHeight="1.5" sx={content}>
      {value}
    </Text>
  );
};

const FieldLabelValue = ({ property, label, model }) => (
  <Field>
    <FieldLabel label={label} />
    <FieldValue value={getLabel(model, property)} />
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
          property="cnc_mjpm_annee_obtention"
          model={formation}
        />
        <FieldLabelValue
          label="Nombre d'heures de formation dans le cadre du CNC MJPM (hors stage)"
          property="cnc_mjpm_heure_formation"
          model={formation}
        />
      </Box>
      <Box>
        <Heading4 mb={1}>{"CNC MAJ"}</Heading4>
        <FieldLabelValue
          label="Année d'obtention du CNC MAJ"
          property="cnc_maj_annee_obtention"
          model={formation}
        />

        {formation.cnc_mjpm_annee_obtention && (
          <FieldLabelValue
            label="Nombre d'heures de formation dans le cadre du CNC MAJ (hors stage)"
            property="cnc_maj_heure_formation"
            model={formation}
          />
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"CNC DPF"}</Heading4>
        <FieldLabelValue
          label="Année d'obtention du CNC DPF"
          property="cnc_dpf_annee_obtention"
          model={formation}
        />
        {formation.cnc_dpf_annee_obtention && (
          <FieldLabelValue
            label="Nombre d'heures de formation dans le cadre du CNC DPF"
            property="cnc_dpf_heure_formation"
            model={formation}
          />
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Niveau de qualification"}</Heading4>
        <FieldLabelValue
          label="Niveau de qualification de 1 à 5"
          property="niveau_qualification"
          model={formation}
        />

        <FieldLabelValue
          label="Niveau de qualification du secrétaire spécialisé de 1 à 5"
          property="niveau_qualification_secretaire_spe"
          model={formation}
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
