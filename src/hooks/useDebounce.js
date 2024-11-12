"use client";

import _ from "lodash";
import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Create a debounced function
    const handler = _.debounce(() => {
      setDebouncedValue(value);
    }, delay);

    // Call the debounced function
    handler();

    // Cleanup function to cancel the debounced function if value changes before delay
    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
