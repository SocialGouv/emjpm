import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Box, Flex, Text } from 'rebass';

import { Button } from '../../../../core/src/Button';
import { PANEL_TYPE } from '../constants/type';
import { MandataireContext } from '../context';

export const ChooseComponent = (props) => {
  const { currentMandataire, lastLogin, lastLoginIsCritical } = props;
  const { setCurrentMandataire, setPanelType } = useContext(MandataireContext);
  return (
    <Flex flexDirection="column">
      <Box mb="2">
        <Text>ChooseComponent id: {currentMandataire}</Text>
        <Text>Last login: {lastLogin}</Text>
        <Text>Last login is critical: {lastLoginIsCritical.toString()}</Text>
      </Box>
      <Box mb="1">
        <Button
          onClick={() => {
            setPanelType(PANEL_TYPE.EDIT);
            setCurrentMandataire(currentMandataire);
          }}
        >
          Fermer
        </Button>
      </Box>
    </Flex>
  );
};

ChooseComponent.defaultProps = {
  currentMandataire: null,
  lastLogin: null,
  lastLoginIsCritical: false
};

ChooseComponent.propTypes = {
  currentMandataire: PropTypes.number,
  lastLogin: PropTypes.string,
  lastLoginIsCritical: PropTypes.bool
};
