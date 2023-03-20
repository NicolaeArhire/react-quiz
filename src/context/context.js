import React, { createContext, useState } from "react";

export const AppContext = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({
    position: "-",
    userName: "-",
    category: "-",
    score: "-",
    queNo: "-",
    time: "-",
  });

  return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
};

export default Provider;
