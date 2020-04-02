import { BuildingHouse } from '@styled-icons/boxicons-solid';
import { Female, Male } from '@styled-icons/fa-solid';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Box, Flex } from 'rebass';

import { Card, Text } from '../../core';
import {
  availabilityIndicatorStyle,
  cardStyle,
  columnStyle,
  decorationStyle,
  descriptionStyle,
  dispoDescriptionStyle,
  labelStyle,
  MandatairelistStyle,
  subtitleStyle,
  titleStyle,
} from './style';

const MandataireListItem = (props) => {
  const {
    gestionnaire: {
      currentAvailability,
      dispoMax,
      email,
      genre,
      telephone,
      isAvailable,
      nom,
      prenom,
      ville,
      etablissement,
      mesuresInProgress,
      mesuresAwaiting,
      type,
    },
    isMagistratMap,
    onClick,
  } = props;
  return (
    <Fragment>
      <Card sx={cardStyle} width="100%">
        <Box sx={decorationStyle(type)} />
        <Flex
          onClick={() => {
            onClick(props);
          }}
          sx={MandatairelistStyle}
        >
          <Flex>
            <Box alignSelf="center" my="1px" mr="1">
              {type === 'service' ? (
                <BuildingHouse size="24" />
              ) : (
                <Fragment>{genre === 'F' ? <Female size="24" /> : <Male size="24" />}</Fragment>
              )}
              {isAvailable}
            </Box>
            <Box>
              <Text sx={titleStyle}>
                {type === 'service' ? (
                  <Fragment>{etablissement}</Fragment>
                ) : (
                  <Fragment>
                    {nom} {prenom}
                  </Fragment>
                )}
              </Text>
              <Text sx={subtitleStyle}>{type}</Text>
            </Box>
          </Flex>
          <Flex width="100px" sx={columnStyle(true, true)}>
            <Text sx={labelStyle}>Ville</Text>
            <Text sx={descriptionStyle}>{ville}</Text>
          </Flex>

          {!isMagistratMap && (
            <Fragment>
              <Flex width="200px" sx={columnStyle(true, true)}>
                <Text sx={labelStyle}>Email</Text>
                <Text sx={descriptionStyle}>{email}</Text>
              </Flex>
              <Flex width="100px" sx={columnStyle(true, true)}>
                <Text sx={labelStyle}>Téléphone</Text>
                <Text sx={descriptionStyle}>{telephone}</Text>
              </Flex>
              <Flex width="90px" sx={columnStyle(false, false)}>
                <Text sx={labelStyle}>En attente</Text>
                <Text sx={descriptionStyle}>{mesuresAwaiting}</Text>
              </Flex>
              <Flex sx={columnStyle(false, false)}>
                <Text sx={labelStyle}>Disponibilité</Text>
                <Text sx={dispoDescriptionStyle(currentAvailability > 0)}>
                  {currentAvailability === undefined ? 'NC' : currentAvailability}
                </Text>
              </Flex>
            </Fragment>
          )}

          <Flex sx={columnStyle(false, false)}>
            <Text sx={labelStyle}>En cours / souhaitée</Text>
            <Text sx={dispoDescriptionStyle(currentAvailability > 0)}>
              {mesuresInProgress === 0 && dispoMax === 0 ? 'NC' : mesuresInProgress}/
              {mesuresInProgress === 0 && dispoMax === 0 ? 'NC' : dispoMax}
            </Text>
          </Flex>

          <Flex alignItems="center">
            <Box sx={availabilityIndicatorStyle(currentAvailability > 0)} />
          </Flex>
        </Flex>
      </Card>
    </Fragment>
  );
};

MandataireListItem.defaultProps = {
  isMagistratMap: false,
  onClick: null,
};

MandataireListItem.propTypes = {
  gestionnaire: PropTypes.shape({
    currentAvailability: PropTypes.number.isRequired,
    cvLink: PropTypes.string.isRequired,
    dispoMax: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    etablissement: PropTypes.string,
    genre: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    mesuresAwaiting: PropTypes.number,
    mesuresInProgress: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    onItemClick: PropTypes.func,
    prenom: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ville: PropTypes.string.isRequired,
  }).isRequired,
  isMagistratMap: PropTypes.bool,
  onClick: PropTypes.func,
};

export { MandataireListItem };
