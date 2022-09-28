import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [activeNote, setActiveNote] = useState({});

  return (
    <Context.Provider
      value={{
        activeNote,
        setActiveNote,
      }}
    >
      {children}
    </Context.Provider>
  );
};
