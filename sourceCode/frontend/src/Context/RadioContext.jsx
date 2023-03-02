import React from 'react';
import { useEffect } from "react";
import { createContext, useState } from "react";

const RadioContext = createContext("Text");

export function RadioProvider(props) {
  const [radio, setRadio] = useState("Text");
  const { children } = props;

  return (
    <RadioContext.Provider value={{ radio, setRadio }}>
      {children}
    </RadioContext.Provider>
  );
}

export default RadioContext;
