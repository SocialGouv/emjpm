import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Box, Flex } from 'rebass';
import { Female, Male } from 'styled-icons/fa-solid';
import { Warning } from 'styled-icons/material';

import { Card, Text } from '../../core';
import { MESURE_TYPE } from './constants/type';
import {
  cardStyle,
  columnStyle,
  decorationStyle,
  descriptionStyle,
  labelStyle,
  mesureListItemStyle,
  statusStyle,
  titleStyle,
  typeStyle,
} from './style';

const GrayMale = styled(Male)`
  color: '#333333';
`;

const GrayFemale = styled(Female)`
  color: '#333333';
`;

const currentYear = new Date().getFullYear();

const MesureListItem = (props) => {
  const {
    mesure: {
      age,
      cabinet,
      civilite,
      dateOuvertureFormated,
      isUrgent,
      judgmentDate,
      numeroDossier,
      numeroRg,
      status,
      tribunal,
      type,
      ville,
    },
    hasTribunal,
    hasFolderNumber,
    onClick,
  } = props;

  let currentStatus;
  if (status === 'Eteindre mesure') {
    currentStatus = 'Mesure éteinte';
  } else {
    currentStatus = status;
  }

  return (
    <Fragment>
      <Card sx={cardStyle} width="100%" onClick={() => onClick(props)}>
        <Box sx={decorationStyle(status)} />
        <Flex sx={mesureListItemStyle}>
          <Box minWidth="220px" mr="1">
            <Text sx={titleStyle}>
              {numeroRg || 'RG-XXXXXX'}
              <Text sx={statusStyle(status)}>{currentStatus || 'non reseigné'}</Text>
            </Text>
            <Text sx={typeStyle}>{type || 'type de mesure non reseigné'}</Text>
          </Box>

          {hasTribunal && (
            <Flex width="280px" sx={columnStyle(true, true)}>
              <Text sx={labelStyle}>Tribunal</Text>
              <Text sx={descriptionStyle}>
                {tribunal || 'Tribunal non renseigné'} {cabinet}
              </Text>
            </Flex>
          )}

          <Flex minWidth="50px" mr="1">
            <Box alignSelf="center" pt="4px" mr="1">
              {civilite && <Fragment>{civilite === 'F' ? <GrayFemale size="24" /> : <GrayMale size="24" />}</Fragment>}
            </Box>
            <Box>
              <Text sx={labelStyle}>Age</Text>
              <Text sx={descriptionStyle}>{currentYear - age || 'nc'}</Text>
            </Box>
          </Flex>

          {hasFolderNumber && (
            <Flex width="90px" sx={columnStyle(true, true)}>
              <Text sx={labelStyle}>Dossier</Text>
              <Text sx={descriptionStyle}>{numeroDossier || 'numeroDossier non reseigné'}</Text>
            </Flex>
          )}

          <Flex width="280px" sx={columnStyle(true, true)}>
            <Text sx={labelStyle}>Commune</Text>
            <Text sx={descriptionStyle}>{ville || 'ville non reseigné'}</Text>
          </Flex>

          {status === MESURE_TYPE.WAITING && (
            <Fragment>
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
              <Flex width="120px" textAlign="left" sx={columnStyle(false, false)}>
                <Text sx={labelStyle}>Date prév. juge.</Text>
                <Text sx={descriptionStyle}>{judgmentDate || 'non reseigné'}</Text>
              </Flex>
            </Fragment>
          )}

          {status !== MESURE_TYPE.WAITING && (
            <Flex minWidth="70px" textAlign="left" sx={columnStyle(false, false)}>
              <Text sx={labelStyle}>Decision du</Text>
              <Text sx={descriptionStyle}>{dateOuvertureFormated || 'non reseigné'}</Text>
            </Flex>
          )}
        </Flex>
      </Card>
    </Fragment>
  );
};

MesureListItem.defaultProps = {
  hasFolderNumber: true,
  hasTribunal: true,
  onClick: null,
};

MesureListItem.propTypes = {
  hasFolderNumber: PropTypes.bool,
  hasTribunal: PropTypes.bool,
  mesure: PropTypes.shape({
    age: PropTypes.string,
    cabinet: PropTypes.string,
    civilite: PropTypes.string,
    codePostal: PropTypes.string,
    currentStatus: PropTypes.string,
    dateOuvertureFormated: PropTypes.string,
    id: PropTypes.number,
    isUrgent: PropTypes.bool,
    judgmentDate: PropTypes.string,
    numeroDossier: PropTypes.string,
    numeroRg: PropTypes.string,
    residence: PropTypes.string,
    status: PropTypes.string,
    tiId: PropTypes.number,
    tribunal: PropTypes.string,
    type: PropTypes.string,
    ville: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

export { MesureListItem };
