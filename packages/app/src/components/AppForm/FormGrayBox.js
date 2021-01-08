const { Box } = require("rebass");

const grayBoxStyle = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  px: "3",
  py: "2",
};

const FormGrayBox = (props) => {
  const { children } = props;
  return (
    <Box sx={grayBoxStyle} width={[1, 2 / 5]} {...props}>
      {children}
    </Box>
  );
};

export { FormGrayBox };
