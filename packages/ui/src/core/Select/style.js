import { useThemeUI } from 'theme-ui';

const getBorderColor = (state, colors) => {
  if (state.isDisabled) return colors.muted;
  if (state.isFocused) return colors.primary;
  return colors.border;
};

export const getStyle = (props) => {
  const { size = 'large' } = props;
  const context = useThemeUI();
  const { fontSizes, fonts, colors } = context.theme;

  return {
    control: (provided, state) => {
      const currentBorderColor = getBorderColor(state, colors);
      return {
        ...provided,
        '&:hover': {
          borderColor: state.isFocused ? colors.primary : colors.border,
        },
        borderColor: currentBorderColor,
        boxShadow: '0',
        fontFamily: fonts.body,
        fontSize: fontSizes[1],
        minHeight: size === 'small' ? '44px' : '54px',
        padding: '0 2px',
      };
    },
  };
};
