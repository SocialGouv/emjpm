import React from "react";

const { Card } = require("rebass");

const FormInputBox = (props) => {
  const { children } = props;
  return (
    <Card width={[1, 2 / 3]} {...props}>
      {children}
    </Card>
  );
};

export { FormInputBox };
