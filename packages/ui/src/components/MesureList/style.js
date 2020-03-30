const TYPES = {
  'Eteindre mesure': '#7EA3AA',
  'Mesure en attente': '#F4AF00',
  'Mesure en cours': '#2DA0FB',
};

const MandatairelistStyle = {
  alignItems: 'center',
  bg: 'white',
  justifyContent: 'space-between',
};

const columnStyle = (isMobileHidden, isTabletHidden) => {
  return {
    '@media screen and (max-width: 40em)': {
      display: isMobileHidden ? 'none' : 'flex',
    },
    '@media screen and (max-width: 52em)': {
      display: isTabletHidden ? 'none' : 'flex',
    },
    flexDirection: 'column',
  };
};

const availabilityIndicatorStyle = (isAvailable) => {
  return {
    bg: isAvailable ? 'success' : 'error',
    borderRadius: 'default',
    height: '10px',
    mr: '1',
    width: '10px',
  };
};

const titleStyle = {
  color: 'black',
  fontFamily: 'heading',
  fontSize: '15px',
  fontWeight: '600',
  my: '4px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const subtitleStyle = {
  color: 'mediumGray',
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: '600',
};

const labelStyle = {
  color: 'mediumGray',
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '600',
  mb: '5px',
  mt: '7px',
};

const descriptionStyle = (isPositive) => {
  return {
    color: isPositive ? 'black' : 'error',
    fontFamily: 'heading',
    fontSize: '13px',
    fontWeight: '600',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
};

const decorationStyle = (status) => {
  return {
    bg: TYPES[status],
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '3px',
  };
};

const statusStyle = (status) => {
  return {
    color: TYPES[status],
    display: 'inline-block',
    fontSize: 0,
    ml: 1,
  };
};

const cardStyle = {
  mb: '1',
  overflow: 'hidden',
  pl: '16px',
  position: 'relative',
};

export {
  availabilityIndicatorStyle,
  MandatairelistStyle,
  columnStyle,
  titleStyle,
  subtitleStyle,
  statusStyle,
  labelStyle,
  descriptionStyle,
  decorationStyle,
  cardStyle,
};
