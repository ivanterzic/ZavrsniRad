import React, { useEffect } from 'react'; 
import { useState } from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import './chatbot.css';
import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");

function Chatbot() {
  const [userTextInput, setUserTextInput] = useState("")
  const openAIKey = "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"
  let idx = 0;
  const configuration = new Configuration({
    apiKey: openAIKey,
  });
  const openai = new OpenAIApi(configuration);
  
  const [data, setData] = useState([{
    "role": "user",
    "content": "Pretend to be Charles Darwin throughout the entirety of this conversation."
  }])

  useEffect(() => {
    async function sendInitial() {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: data,
      });
      console.log(response.data.choices[0].message);
      setData([...data, {
        "role" : "assistant", 
        "content" : response.data.choices[0].message.content
      }])
    }
    sendInitial();
  }, []);
 
  async function sendPrompt(){

    data.push({"role" : "user", "content" : userTextInput})
    setUserTextInput("")
    console.log(data)

    const response = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: data});
    console.log(response.data.choices[0].message);

    await setData([...data, {"role" : "assistant", "content" : response.data.choices[0].message.content}])
    
    console.log(data)
    
  }

  return (
    <>
        {data.map( (d, key) => {
            let r = d.role.toString()
            let c = d.content.toString()
            console.log(data)
            return r === "assistant" ? 
              (<div className='bg-dark text-light mt-1'>{r}: {c}</div>)
              :
              (<div className='bg-secondary text-light mt-1'>{r}: {c}</div>);
          }
        )}
        <TextInput
          value = {userTextInput}
          onChangeText ={text => setUserTextInput(text)}
          placeholder = "Ask me a question..."
        />
        <TouchableOpacity
          onPress = { (e) => {sendPrompt()} }
        >
          <Text>
            Send
          </Text>
        </TouchableOpacity>
      
    </>
    
  );
}

export default Chatbot;