import React, { createContext } from "react";
import { useState } from "react";

export const Check = createContext();

function AppContext({ children }) {
  const [cart, setCart] = useState([]);

  return <Check.Provider value={{ cart, setCart }}>{children}</Check.Provider>;
}

export default AppContext;
