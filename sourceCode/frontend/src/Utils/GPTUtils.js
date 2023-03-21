import { loader, scrollDown } from "./Utils";
import backend from "../backendAPI";

export async function sendCompletionRequest(chatData) {
  
  let response = await backend.post("/chatcompletion", chatData)
  return response;
};

export async function sendInitial(chatData, setChatData, prompt, setDisabled, setStatus) {
  setDisabled(false)
  setStatus("Pending")

  const div = document.createElement("div")
  document.getElementById("chat-header").appendChild(div)
  div.innerHTML += "Connecting..."

  setChatData([])
  chatData.push(
    {
      "role" : "user", 
    "content" : prompt
    })
  //console.log(chatData)
  
  /*let response = await sendCompletionRequest(chatData)*/ 
  
  //dodan umjetan odgovor kojim cemo smanjiti poruke poslane na API i samim tim smanjiti API pricing


  //console.log("Initial message sent")
  //console.log(response.data.choices[0].message);

  setChatData([...chatData, {
    "role" : "assistant", 
    "content" : "OK"
  }])
  setStatus("Active")
  setDisabled(false)
  div.remove() 
}

export async function sendPrompt(chatData, setChatData, userTextInput, setUserTextInput, setDisabled){
  setDisabled(true)

  await chatData.push({"role" : "user", "content" : userTextInput})
  await setChatData(chatData)
  setUserTextInput("")
  setDisabled(true)
  console.log(chatData)
  
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
  console.log(response)
  /*const response = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: chatData});*/

  console.log(response.data);
  await setChatData([...chatData, {"role" : "assistant", "content" : response.data.content}])
  setDisabled(false)
  try{
      div.remove()
  } catch (e) {console.log(e)}
  console.log(chatData)  
    return response.data.content
  }
