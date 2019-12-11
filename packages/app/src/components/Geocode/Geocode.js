import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "rebass";

import { useDebounce, useOnClickOutside } from "../../lib/hooks";
import { GeocodeResults } from "./GeocodeResults";
import { containerStyle, resultContainerStyle } from "./style";
import { geocode } from "./util";

const Geocode = props => {
  const { onChange, onError } = props;
  const containerRef = useRef();
  const [isFocused, setFocus] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useOnClickOutside(containerRef, () => setFocus(false));

  useEffect(() => {
    if (!debouncedValue) {
      return;
    }

    async function runEffect(query) {
      const { error, results } = await geocode(query);

      if (error) {
        onError(error);
        return;
      }

      setResults(results);
    }

    runEffect(debouncedValue);
  }, [debouncedValue, onError]);

  const _onChange = useCallback(
    event => {
      isFocused && setValue(event.target.value);
    },
    [isFocused]
  );

  const _onSelect = result => {
    const { city, postcode } = result;

    onChange(result);
    setValue(`${city}, ${postcode}`);
    setFocus(false);
  };

  const shouldDisplayResults = isFocused && value && results.length > 0;

  return (
    <Box sx={containerStyle} ref={containerRef}>
      <input
        onChange={_onChange}
        type="text"
        name="geocode"
        placeholder="Ville, code postal, ..."
        value={value || ""}
        onFocus={() => setFocus(true)}
      />
      {shouldDisplayResults && (
        <Box sx={resultContainerStyle}>
          <GeocodeResults onSelect={_onSelect} results={results} />
        </Box>
      )}
    </Box>
  );
};

Geocode.defaultProps = {
  name: "address",
  onChange: () => {},
  onError: () => {}
};

Geocode.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func
};

export { Geocode };
