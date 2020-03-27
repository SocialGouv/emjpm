import { useApolloClient } from "@apollo/react-hooks";
import { AsyncSelect } from "@emjpm/ui";
import debounce from "p-debounce";
import PropTypes from "prop-types";
import React from "react";

import { TRIBUNAL } from "./queries";

const TribunalAutoComplete = props => {
  const client = useApolloClient();
  const { defaultOptions, hasError, value, name, id, onChange } = props;
  return (
    <AsyncSelect
      name={name}
      id={id}
      value={value}
      defaultOptions={defaultOptions}
      hasError={hasError}
      isClearable
      loadOptions={debounce(async query => {
        const { data } = await client.query({
          query: TRIBUNAL,
          variables: { name: `%${query}%` }
        });

        return !data.tis
          ? []
          : data.tis.map(t => ({
              label: t.etablissement,
              value: t.id
            }));
      }, 500)}
      placeholder={"Tribunal"}
      onChange={onChange}
    />
  );
};

TribunalAutoComplete.defaultProps = {
  hasError: false
};

TribunalAutoComplete.propTypes = {
  name: PropTypes.string,
  value: PropTypes.object,
  id: PropTypes.string,
  hasError: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  defaultOptions: PropTypes.arrayOf(PropTypes.object)
};

export default TribunalAutoComplete;
