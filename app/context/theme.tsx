"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState("red");

  return (
    <ThemeContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
