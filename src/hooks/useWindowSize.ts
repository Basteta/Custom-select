import { useState, useEffect } from "react";

// Custom hook to get current size of the browser window

export const useWindowSize = (): { width: number; height: number } => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
