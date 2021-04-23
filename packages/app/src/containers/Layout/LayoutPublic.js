import { Box } from "rebass";

import { Footer } from "~/containers/Footer";
import { Header } from "~/components";

function LayoutPublic(props) {
  const { children } = props;

  return (
    <>
      <Box
        sx={{ height: "66px", position: "relative", "z-index": "1000" }}
        bg="cardPrimary"
      >
        <Header isDisconnected />
      </Box>
      <Box>{children}</Box>
      <Footer />
    </>
  );
}

export { LayoutPublic };
