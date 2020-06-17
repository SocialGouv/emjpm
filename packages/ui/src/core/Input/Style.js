const InputWrapperStyle = (props) => {
  return {
    bg: 'cardPrimary',
    border: '1px solid',
    borderColor: () => {
      if (props.isValid) return 'success';
      if (props.hasError) return 'error';
      return 'border';
    },
    borderRadius: 'default',
    boxShadow: 'none',
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '1',
    height: props.size === 'small' ? '44px' : '54px',
    isolation: 'isolate',
    position: 'relative',
    width: '100%',
    zIndex: 0,
  };
};

const InputStyle = (props) => {
  return {
    bg:  props.readOnly? '#f0f0f0' : 'transparent',
    border: '0',
    boxShadow: 'none',
    color: 'text',
    fontSize: '1',
    fontWeight: props.isActive ? '600' : '500',
    height: props.size === 'small' ? '42px' : '52px',
    lineHeight: props.size === 'small' ? '22px' : '32px',
    opacity: props.readOnly || props.isActive ? '1' : '0',
    outline: 'none',
    pb: '1',
    position: 'relative',
    pt: props.isActive ? '15px' : '10px',
    px: '2',
    transition: '150ms ease-in-out all',
    width: '100%',
    zIndex: props.isActive ? 1 : 0,
  };
};

const LabelStyle = (props) => {
  return {
    color: () => {
      if (props.isActive) return 'primary';
      return 'textSecondary';
    },
    fontSize: () => {
      if (props.isActive) return props.size === 'small' ? '10px' : '0';
      return '1';
    },
    fontWeight: '600',
    height: props.size === 'small' ? '42px' : '52px',
    left: '0',
    lineHeight: props.size === 'small' ? '22px' : '32px',
    position: 'absolute',
    px: '2',
    py: '1',
    top: props.isActive ? '-12px' : '0px',
    transition: '150ms ease-in-out all',
    width: '100%',
    zIndex: 0,
  };
};

export { InputWrapperStyle, InputStyle, LabelStyle };
