import { Card, Heading0, Heading4 } from "@socialgouv/emjpm-ui-core";
const DirectionIndicator = props => {
  return (
    <Card flexBasis="250px">
      <Heading4>{props.title}</Heading4>
      <Heading0 mt={"7"}>{props.indicator}</Heading0>
    </Card>
  );
};

export { DirectionIndicator };
