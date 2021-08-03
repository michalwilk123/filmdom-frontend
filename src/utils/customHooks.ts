import { useState, useEffect } from "react";

const getWindowDimensions = (): { width: number; height: number } => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState(
    () => window.localStorage.getItem(key) || null
  );

  const setValue = (value: any) => {
    if (value === null) {
      const newLocal =
        "You cannot set LS value to null. " +
        "To delete the item, run " +
        "clearValue(key)";
      throw newLocal;
    }
    window.localStorage.setItem(key, value);
    setStoredValue(value);
  };

  const clearValue = (): void => {
    window.localStorage.removeItem(key);
    setStoredValue(null);
  };

  return [storedValue, setValue, clearValue] as const;
};
