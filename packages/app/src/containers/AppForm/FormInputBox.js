const { Card } = require("rebass");

function FormInputBox(props) {
  const { children } = props;
  return (
    <Card width={[1, 2 / 3]} {...props}>
      {children}
    </Card>
  );
}

export { FormInputBox };
