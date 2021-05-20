import Fuse from "fuse.js";
import { Select } from "~/components";
import { useMemo } from "react";

export default function SelectCodePostal({
  value,
  onChange,
  placeholder = "Saisissez le nom de la ville",
  ...props
}) {
  const fuse = useMemo(() => {
    const f = new Fuse();
    const options = {
      includeScore: true,
      keys: ["communes.code_postal.value"],
    };
    return f;
  });
  const options = {};
  return (
    <Select
      isCreatable
      isClearable
      noOptionsMessage={() => placeholder}
      options={options}
      filterOption={() => true}
      {...props}
    />
  );
}
