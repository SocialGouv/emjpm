import { useApolloClient } from "@apollo/client";
import debounce from "p-debounce";

import { FormGroupSelect } from "~/components/AppForm";

import { TRIBUNAL } from "./queries";

export default function TribunalAutoComplete({
  defaultOptions,
  value,
  ...props
}) {
  const client = useApolloClient();
  return (
    <FormGroupSelect
      value={value}
      defaultOptions={defaultOptions}
      isClearable={false}
      loadOptions={debounce(async (query) => {
        const { data } = await client.query({
          query: TRIBUNAL,
          variables: { name: `%${query}%` },
        });

        return !data.tis
          ? []
          : data.tis.map((t) => ({
              label: t.etablissement,
              value: t.id,
            }));
      }, 500)}
      placeholder={"Tribunal"}
      {...props}
    />
  );
}
