import styled from '@emotion/styled';
import { Female } from '@styled-icons/fa-solid/Female';
import { Male } from '@styled-icons/fa-solid/Male';
import { Warning } from '@styled-icons/material/Warning';
import PropTypes from 'prop-types';
import React, { Fragment, useContext } from 'react';
import { Box, Flex } from 'rebass';

import { Button, Card, Text } from '../../core';
import { MESURE_TYPE, PANEL_TYPE } from './constants/type';
import { MesureContext } from './context';
import { MesurePanel } from './MesurePanel';
import {
  cardStyle,
  columnStyle,
  decorationStyle,
  descriptionStyle,
  labelStyle,
  MandatairelistStyle,
  statusStyle,
  subtitleStyle,
  titleStyle,
} from './style';

const GrayMale = styled(Male)`
  color: '#333333';
`;

const GrayFemale = styled(Female)`
  color: '#333333';
`;

const Mesure = (props) => {
  const { currentMesure, currentPanelType, setCurrentMesure, setPanelType } = useContext(MesureContext);

  const {
    type,
    ville,
    numeroRg,
    dateOuvertureFormated,
    dateOuverture,
    age,
    civilite,
    cabinet,
    status,
    id,
    onPanelOpen,
    EditComponent,
    RemoveComponent,
    AcceptComponent,
    CloseComponent,
    ReactivateComponent,
    residence,
    codePostal,
    numeroDossier,
    antenneId,
    judgmentDate,
    isUrgent,
    isMagistrat,
    tribunal,
    tiId,
    latitude,
    longitude,
  } = props;

  let currentStatus;
  if (status === 'Eteindre mesure') {
    currentStatus = 'Mesure éteinte';
  } else {
    currentStatus = status;
  }
  const currentYear = new Date().getFullYear();

  return (
    <Fragment>
      <Card sx={cardStyle} width="100%">
        <Box sx={decorationStyle(status)} />
        <Flex sx={MandatairelistStyle}>
          <Box width="270px">
            <Text sx={titleStyle}>
              {numeroRg || 'RG-XXXXXX'}
              <Text sx={statusStyle(status)}>{currentStatus || 'non reseigné'}</Text>
            </Text>
            <Text sx={subtitleStyle}>{type || 'type de mesure non reseigné'}</Text>
            {!isMagistrat && (
              <Text mt="4px" sx={subtitleStyle}>
                {tribunal || 'Tribunal non renseigné'} {cabinet}
              </Text>
            )}
          </Box>

          <Flex width="70px">
            <Box alignSelf="center" pt="4px" mr="1">
              {civilite && <Fragment>{civilite === 'F' ? <GrayFemale size="24" /> : <GrayMale size="24" />}</Fragment>}
            </Box>
            <Box>
              <Text sx={labelStyle}>Age</Text>
              <Text sx={descriptionStyle}>{currentYear - age || 'nc'}</Text>
            </Box>
          </Flex>

          {!isMagistrat && (
            <Fragment>
              <Flex width="120px" sx={columnStyle(true, true)}>
                <Text sx={labelStyle}>Numero de dossier</Text>
                <Text sx={descriptionStyle}>{numeroDossier || 'numeroDossier non reseigné'}</Text>
              </Flex>

              <Flex width="150px" sx={columnStyle(true, true)}>
                <Text sx={labelStyle}>Commune</Text>
                <Text sx={descriptionStyle}>{ville || 'ville non reseigné'}</Text>
              </Flex>
            </Fragment>
          )}
          {status === MESURE_TYPE.WAITING && (
            <Fragment>
              <Flex width="120px" textAlign="left" sx={columnStyle(false, false)}>
                <Text sx={labelStyle}>Date prév. juge.</Text>
                <Text sx={descriptionStyle}>{judgmentDate || 'non reseigné'}</Text>
              </Flex>
              <Flex width="130px">
                <Box alignSelf="center" pt="4px" mr="1">
                  <Fragment>
                    {isUrgent && (
                      <Flex alignItems="center">
                        <Warning size="24" />
                        <Text ml="1" sx={descriptionStyle}>
                          Urgent
                        </Text>
                      </Flex>
                    )}
                  </Fragment>
                </Box>
              </Flex>
            </Fragment>
          )}
          {status !== MESURE_TYPE.WAITING && (
            <Fragment>
              <Flex width="120px" textAlign="left" sx={columnStyle(false, false)}>
                <Text sx={labelStyle}>Decision du</Text>
                <Text sx={descriptionStyle}>{dateOuvertureFormated || 'non reseigné'}</Text>
              </Flex>
            </Fragment>
          )}

          {(status === MESURE_TYPE.IN_PROGRESS ||
            status === MESURE_TYPE.CLOSED ||
            (status === MESURE_TYPE.WAITING && isMagistrat)) && (
            <Box mr="1" width="120px" sx={columnStyle(true, true)}>
              <Button
                width="120px"
                onClick={() => {
                  // Move me to dedicated function
                  setCurrentMesure(id);
                  if (status === MESURE_TYPE.WAITING && isMagistrat) setPanelType(PANEL_TYPE.EDIT);
                  if (status === MESURE_TYPE.CLOSED) setPanelType(PANEL_TYPE.REMOVE);
                  if (status === MESURE_TYPE.IN_PROGRESS) setPanelType(PANEL_TYPE.EDIT);
                  // Remove if useless
                  onPanelOpen(id);
                }}
                variant="outline"
              >
                {status === MESURE_TYPE.WAITING && isMagistrat && <Fragment>Modifier</Fragment>}
                {status === MESURE_TYPE.IN_PROGRESS && <Fragment>Modifier</Fragment>}
                {status === MESURE_TYPE.CLOSED && <Fragment>Supprimer</Fragment>}
              </Button>
            </Box>
          )}

          <Box sx={columnStyle(true, true)}>
            <Button
              width="180px"
              onClick={() => {
                // Move me to dedicated function
                setCurrentMesure(id);
                if (status === MESURE_TYPE.WAITING && isMagistrat) setPanelType(PANEL_TYPE.REMOVE);
                else if (status === MESURE_TYPE.WAITING) setPanelType(PANEL_TYPE.ACCEPT);
                else if (status === MESURE_TYPE.IN_PROGRESS) setPanelType(PANEL_TYPE.CLOSE);
                else if (status === MESURE_TYPE.CLOSED) setPanelType(PANEL_TYPE.REACTIVATE);
                // Remove if useless
                onPanelOpen(id);
              }}
              variant="outline"
            >
              {status === MESURE_TYPE.WAITING && isMagistrat && <Fragment>Supprimer la mesure</Fragment>}
              {status === MESURE_TYPE.WAITING && !isMagistrat && <Fragment>Accepter la mesure</Fragment>}
              {status === MESURE_TYPE.IN_PROGRESS && <Fragment>Fin de mandat</Fragment>}
              {status === MESURE_TYPE.CLOSED && <Fragment>Reactiver la mesure</Fragment>}
            </Button>
          </Box>
        </Flex>
      </Card>
      {currentMesure === id && (
        <Card p="0" pt="1" m="1" mt="-20px">
          <MesurePanel
            currentPanelType={currentPanelType}
            EditComponent={() => (
              <EditComponent
                currentMesure={currentMesure}
                dateOuverture={dateOuverture}
                type={type}
                tribunal={tribunal}
                cabinet={cabinet}
                residence={residence}
                codePostal={codePostal}
                latitude={latitude}
                longitude={longitude}
                ville={ville}
                civilite={civilite}
                age={age}
                tiId={tiId}
                numeroDossier={numeroDossier}
                numeroRg={numeroRg}
                status={status}
                antenneId={antenneId}
              />
            )}
            RemoveComponent={RemoveComponent}
            AcceptComponent={AcceptComponent}
            CloseComponent={CloseComponent}
            ReactivateComponent={ReactivateComponent}
            currentMesure={currentMesure}
          />
        </Card>
      )}
    </Fragment>
  );
};

Mesure.propTypes = {
  AcceptComponent: PropTypes.elementType,
  CloseComponent: PropTypes.elementType,
  EditComponent: PropTypes.elementType,
  ReactivateComponent: PropTypes.elementType,
  RemoveComponent: PropTypes.elementType,
  age: PropTypes.string.isRequired,
  antenneId: PropTypes.number,
  cabinet: PropTypes.string,
  civilite: PropTypes.string.isRequired,
  codePostal: PropTypes.string.isRequired,
  dateOuverture: PropTypes.string.isRequired,
  dateOuvertureFormated: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isMagistrat: PropTypes.bool,
  isUrgent: PropTypes.bool,
  judgmentDate: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  numeroDossier: PropTypes.string,
  numeroRg: PropTypes.string.isRequired,
  onPanelOpen: PropTypes.func,
  residence: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  tiId: PropTypes.number,
  tribunal: PropTypes.string,
  type: PropTypes.string.isRequired,
  ville: PropTypes.string.isRequired,
};

Mesure.defaultProps = {
  AcceptComponent: null,
  CloseComponent: null,
  EditComponent: null,
  ReactivateComponent: null,
  RemoveComponent: null,
  antenneId: null,
  cabinet: null,
  isMagistrat: false,
  isUrgent: false,
  judgmentDate: null,
  numeroDossier: null,
  onPanelOpen: null,
  tiId: null,
  tribunal: null,
};

export { Mesure };
