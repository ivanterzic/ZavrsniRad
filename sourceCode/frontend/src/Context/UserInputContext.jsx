import React from 'react';
import { createContext, useState } from "react";

const UserTextInputContext = createContext("");

export function UserTextInputProvider(props) {
  const [userTextInput, setUserTextInput] = useState("");
  const { children } = props;

  return (
    <UserTextInputContext.Provider value={{ userTextInput, setUserTextInput }}>
      {children}
    </UserTextInputContext.Provider>
  );
}

export default UserTextInputContext;