const { useState, useEffect } = require("react");

function getSize() {
  if (typeof window !== "undefined") {
    return {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
      outerHeight: window.outerHeight,
      outerWidth: window.outerWidth
    };
  }
  return {
    innerHeight: "100%",
    innerWidth: "100%",
    outerHeight: 0,
    outerWidth: 0
  };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export { useWindowSize };
