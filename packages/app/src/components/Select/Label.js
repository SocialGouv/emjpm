import { Box } from "rebass";

import { LabelStyle } from "./style";

export default function Label({ htmlFor, children, ...props }) {
  return (
    <Box as="label" htmlFor={htmlFor} sx={LabelStyle(props)} {...props}>
      {children}
    </Box>
  );
}
