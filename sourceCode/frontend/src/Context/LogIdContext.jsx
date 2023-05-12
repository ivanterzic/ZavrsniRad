import React from 'react';
import { createContext, useState } from "react";

const LogIdContext = createContext(null);

export function LogContextProvider(props) {
  const [log, setLog] = useState(null);
  const {children} = props;

  return (
    <LogIdContext.Provider value={{ log, setLog }}>
      {children}
    </LogIdContext.Provider>
  );
}

export default LogIdContext;
