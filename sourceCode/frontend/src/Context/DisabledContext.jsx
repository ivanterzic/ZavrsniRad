import React from 'react';
import { createContext, useState } from "react";

const DisabledContext = createContext(true);

export function DisabledProvider(props) {
  const [disabled, setDisabled] = useState(true);
  const {children} = props;

  return (
    <DisabledContext.Provider value={{ disabled, setDisabled }}>
      {children}
    </DisabledContext.Provider>
  );
}

export default DisabledContext;
