import React from "react";
import { Box } from "rebass";
import { Card, Heading0, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";

const Indicator = props => {
  const { error, loading, indicator } = props;
  if (error) {
    return (
      <Card flexBasis="24%">
        <Heading4>{props.title}</Heading4>
        <Heading4 color="error" mt={"7"}>
          aucune données disponible
        </Heading4>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card flexBasis="24%">
        <Heading4>{props.title}</Heading4>
        <Box mt="7">
          <Spinner />
        </Box>
      </Card>
    );
  }

  return (
    <Card flexBasis={["100%", "24%"]}>
      <Heading4>{props.title}</Heading4>
      <Heading0 mt={"7"}>{indicator}</Heading0>
    </Card>
  );
};

export { Indicator };
