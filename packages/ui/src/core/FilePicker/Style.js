const InputWrapperStyle = (props) => {
  return {
    bg: 'cardPrimary',
    border: '2px dashed',
    borderColor: () => {
      if (props.isValid) return 'success';
      if (props.hasError) return 'error';
      return 'border';
    },
    borderRadius: 'default',
    boxShadow: 'none',
    fontFamily: '"Open Sans", sans-serif',
    isolation: 'isolate',
    zIndex: 0,
  };
};

const InputStyle = {
  display: '0.1px',
  height: '0.1px',
  opacity: '0',
  overflow: 'hidden',
  position: 'absolute',
  zIndex: '-1',
};

const LabelStyle = (props) => {
  return {
    color: () => {
      if (props.isActive) return 'primary';
      return 'textSecondary';
    },
    fontSize: '4',
    fontWeight: '600',
    padding: "6",
    textAlign: 'center',
    zIndex: 0,
  };
};

export { InputWrapperStyle, InputStyle, LabelStyle };
