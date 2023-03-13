import React from 'react';
import { createContext, useState } from "react";

const ChatDataContext = createContext([]);

export function ChatDataProvider(props) {
  const [chatData, setChatData] = useState([]);
  const {children} = props;

  return (
    <ChatDataContext.Provider value={{ chatData, setChatData }}>
      {children}
    </ChatDataContext.Provider>
  );
}

export default ChatDataContext;
