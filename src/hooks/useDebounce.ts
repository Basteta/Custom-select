import { useState, useEffect } from "react";

// From https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

// Custom hook to trigger a function only once per use case.

export default function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedValue;
}
