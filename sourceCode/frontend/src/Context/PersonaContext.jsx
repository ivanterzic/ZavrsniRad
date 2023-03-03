import React from 'react';
import { useEffect } from "react";
import { createContext, useState } from "react";

const PersonaContext = createContext();

export function PersonaProvider(props) {
  const [persona, setPersona] = useState();
  const {children} = props;

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export default PersonaContext;
