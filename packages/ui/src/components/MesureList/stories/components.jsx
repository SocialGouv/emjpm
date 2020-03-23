import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Box, Flex, Text } from 'rebass';

import { Button } from '../../../../core/src/Button';
import { PANEL_TYPE } from '../constants/type';
import { MesureContext } from '../context';

export const EditComponent = (props) => {
  const { currentMesure, latitude } = props;
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexDirection="column">
      <Box mb="2">
        <Text>EditComponent id: {currentMesure} lat: {latitude}</Text>
      </Box>
      <Box mb="1">
        <Button
          onClick={() => {
            setPanelType(PANEL_TYPE.EDIT);
            setCurrentMesure();
          }}
        >
          Fermer
        </Button>
      </Box>
    </Flex>
  );
};

EditComponent.propTypes = {
  currentMesure: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired
};

export const RemoveComponent = (props) => {
  const { currentMesure } = props;
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexDirection="column">
      <Box mb="2">
        <Text>RemoveComponent id: {currentMesure}</Text>
      </Box>
      <Box mb="1">
        <Button
          onClick={() => {
            setPanelType(PANEL_TYPE.REMOVE);
            setCurrentMesure();
          }}
        >
          Fermer
        </Button>
      </Box>
    </Flex>
  );
};

RemoveComponent.propTypes = {
  currentMesure: PropTypes.number.isRequired,
};

export const AcceptComponent = (props) => {
  const { currentMesure } = props;
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexDirection="column">
      <Box mb="2">
        <Text>AcceptComponent id: {currentMesure}</Text>
      </Box>
      <Box mb="1">
        <Button
          onClick={() => {
            setPanelType(PANEL_TYPE.ACCEPT);
            setCurrentMesure();
          }}
        >
          Fermer
        </Button>
      </Box>
    </Flex>
  );
};

AcceptComponent.propTypes = {
  currentMesure: PropTypes.number.isRequired,
};

export const CloseComponent = (props) => {
  const { currentMesure } = props;
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexDirection="column">
      <Box mb="2">
        <Text>CloseComponent id: {currentMesure}</Text>
      </Box>
      <Box mb="1">
        <Button
          onClick={() => {
            setPanelType(PANEL_TYPE.CLOSE);
            setCurrentMesure();
          }}
        >
          Fermer
        </Button>
      </Box>
    </Flex>
  );
};

CloseComponent.propTypes = {
  currentMesure: PropTypes.number.isRequired,
};

export const ReactivateComponent = (props) => {
  const { currentMesure } = props;
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexDirection="column">
      <Box mb="2">
        <Text>ReactivateComponent id: {currentMesure}</Text>
      </Box>
      <Box mb="1">
        <Button
          onClick={() => {
            setPanelType(PANEL_TYPE.REACTIVATE);
            setCurrentMesure();
          }}
        >
          Fermer
        </Button>
      </Box>
    </Flex>
  );
};

ReactivateComponent.propTypes = {
  currentMesure: PropTypes.number.isRequired,
};

export const Link = (props) => {
  const { href, children } = props;
  return <a href={href}>{children}</a>;
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
