import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Select } from "~/components";

import { searchAdresse } from "~/query-service/nomatim";

const debounceInterval = 300;

const loadOptions = async (search) => {
  const result = await searchAdresse(search);
  const options = result.map((data) => {
    const { display_name } = data;
    return {
      value: display_name,
      label: display_name,
      data,
    };
  });
  return options;
};

export default function SelectAdresse({ label, placeholder, onChange, value }) {
  const [loadState, setLoadState] = useState(() => ({
    isLoading: false,
    loadedOptions: [],
  }));
  const debouncedLoadOptions = useDebouncedCallback(async (inputValue) => {
    let loadedOptions;
    try {
      loadedOptions = await loadOptions(inputValue);
    } catch (e) {
      loadedOptions = [];
    }
    setLoadState({
      isLoading: false,
      loadedOptions,
    });
  }, debounceInterval);

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, [debouncedLoadOptions]);

  let loadCallback;
  if (loadOptions) {
    loadCallback = (inputValue) => {
      if (!loadState.isLoading) {
        setLoadState({ isLoading: true, loadedOptions: [] });
      }
      debouncedLoadOptions.callback(inputValue);
    };
  }

  const inputValueRef = useRef();

  const { isLoading, loadedOptions } = loadState;
  return (
    <Select
      size="small"
      loadOptions={loadOptions}
      isCreatable
      label={label}
      placeholder={placeholder}
      isClearable
      options={loadedOptions}
      isLoading={isLoading}
      onInputChange={(value, event) => {
        const { action } = event;
        if (action === "input-change") {
          if (inputValueRef.current !== value) {
            loadCallback && loadCallback(value);
          }
          inputValueRef.current = value;
        }
      }}
      onChange={onChange}
      value={value}
    />
  );
}
