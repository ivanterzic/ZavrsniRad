import React from 'react';
import { createContext, useState } from "react";

const LoggedInContext = createContext([]);

export function LoggedInProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const {children} = props;

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
}

export default LoggedInContext;
