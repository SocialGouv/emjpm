import { Flex } from "rebass";

const DocumentLink = ({ children, document }) => (
  <a href={document}>
    <Flex
      maxWidth="200px"
      flexDirection="column"
      justifyContent="center"
      alignItem="center"
      pt={6}
      pb={6}
      pr={2}
      pl={2}
      m={2}
      sx={{
        border: "1px solid",
      }}
    >
      {children}
    </Flex>
  </a>
);

export { DocumentLink };
