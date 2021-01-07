import { useApolloClient } from "@apollo/client";
import debounce from "p-debounce";
import PropTypes from "prop-types";
import React from "react";

import { AsyncSelect } from "~/ui";

import { TRIBUNAL } from "./queries";

const TribunalAutoComplete = (props) => {
  const client = useApolloClient();
  const { defaultOptions, hasError, value, name, id, onChange, size } = props;
  return (
    <AsyncSelect
      instanceId={name}
      name={name}
      id={id}
      value={value}
      defaultOptions={defaultOptions}
      hasError={hasError}
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
      onChange={onChange}
      size={size || ""}
    />
  );
};

TribunalAutoComplete.defaultProps = {
  hasError: false,
};

TribunalAutoComplete.propTypes = {
  defaultOptions: PropTypes.arrayOf(PropTypes.object),
  hasError: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default TribunalAutoComplete;
