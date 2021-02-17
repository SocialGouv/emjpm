import { Box } from "rebass";

const grayBoxStyle = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  px: "3",
  py: "2",
};

export default function FormGrayBox(props) {
  const { children } = props;
  return (
    <Box sx={grayBoxStyle} width={[1, 2 / 5]} {...props}>
      {children}
    </Box>
  );
}
