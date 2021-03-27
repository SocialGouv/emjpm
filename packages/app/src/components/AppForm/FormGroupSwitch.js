import { useState } from "react";

import { Switch } from "~/components";

export default function FormGroupSwitch(props) {
  const [checked, setChecked] = useState();
  const onChange = (e) => {
    setChecked(!checked);
  };
  return <Switch onChange={onChange} isChecked={checked} {...props} />;
}
