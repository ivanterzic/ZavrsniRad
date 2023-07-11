import { loader, scrollDown } from "./Utils";
import backend from "../backendAPI";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sendCompletionRequest(chatData) {
  let response = await backend.post("/chatcompletion", chatData)
  //await sleep(20000)
  return response;
};

export async function sendStopCompletionRequest(chatData, stop) {
  let response = await backend.post("/chatcompletion/withstop", {
    "chatData" : chatData,
    "stop" : stop
  })
  await sleep(20000)
  return response;
};

export async function sendInitial(chatData, setChatData, prompt, setDisabled, setStatus) {
  setDisabled(false)
  setStatus("Pending")
  let div
  if (document.getElementById("chat-header") !== null){
    div = document.createElement("div")
    document.getElementById("chat-header").appendChild(div)
    div.innerHTML += "Connecting..."
  }
 
  setChatData([])
  chatData.push(
    {
      "role" : "user", 
    "content" : prompt
    })
  setChatData([...chatData, {
    "role" : "assistant", 
    "content" : "OK."
  }])
  setStatus("Active")
  setDisabled(false)
  if (document.getElementById("chat-header") !== null){
    div.remove() 
  }
  
}

export async function sendPrompt(chatData, setChatData, userTextInput, setUserTextInput, setDisabled){
  try{
    setDisabled(true)
    await chatData.push({"role" : "user", "content" : userTextInput})
    await setChatData(chatData)
    setUserTextInput("")
    setDisabled(true)  
    let div
    try{
        div = document.createElement("div")
        document.getElementById("chat-header").appendChild(div)
        loader(div)
    } catch(e){console.log(e)}
    
    try{scrollDown(document.getElementById("chat-body"))} catch (e) {console.log("No div to scroll down on")}
    let response
    try {
      response = await sendCompletionRequest(chatData)
      console.log(response)
      if (response.status == 429){
        try {
          div.remove()
        } catch (e) {console.log(e)}
        setDisabled(false)
        alert("OpenAI API is overcrowded.")
        return
      }
    } catch (e) {
      try {
        div.remove()
      } catch (e) {console.log(e)}
      setDisabled(false)
      alert("An error has occured while reaching OpenAI API")
      return
    } 
    await setChatData([...chatData, {"role" : "assistant", "content" : response.data.content}])
    setDisabled(false)
    try{
        div.remove()
    } catch (e) {console.log(e)}
    console.log(chatData)  
      return response.data.content
  }
  catch (e){
    alert("An error has occured while reaching OpenAI API")
  }
  
}

export async function sendTwoPersonaPrompt(chatData, textInput, setChatData, stop){
  //console.log(textInput)
  await chatData.push({"role" : "user", "content" : textInput})
  await setChatData(chatData)
  try{scrollDown(document.getElementById("chat-body"))} catch (e) {console.log("No div to scroll down on")}
  let response
  try {
    response = await sendStopCompletionRequest(chatData, stop)
    console.log(response)
    if (response.status == 429){
      alert("OpenAI API is overcrowded.")
      return
    }
  } catch (e) {
    alert("An error has occured while reaching OpenAI API")
    return
  } 
  //console.log(response.data);
  await setChatData([...chatData, {"role" : "assistant", "content" : response.data.content}])
  //console.log(chatData)  
    return response.data.content
}
