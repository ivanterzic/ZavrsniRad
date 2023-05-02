import React from 'react';
import { createContext, useState } from "react";

const UserContext = createContext([]);

export function UserProvider(props) {
  const [user, setUser] = useState(undefined);
  const {children} = props;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
