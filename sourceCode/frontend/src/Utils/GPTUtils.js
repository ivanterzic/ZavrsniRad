import { loader, scrollDown } from "./Utils";

const { Configuration, OpenAIApi } = require("openai");
const model = "gpt-3.5-turbo"

const openAIKey = "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"
const configuration = new Configuration({ apiKey: openAIKey, });
const openai = new OpenAIApi(configuration);

export async function sendCompletionRequest(chatData) {
    const response = await openai.createChatCompletion({
      model: model,
      messages: chatData,
      temperature : 0.8, //2 je too much, daje prerandom odgovore, 0.8 je okej
      //top_p : 1,
      //max_tokens : , 
      presence_penalty : 1.3,
      //frequency_penalty : 1
    })
    return response
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
  
  let response = await sendCompletionRequest(chatData)
  /*const response = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: chatData});*/

  console.log(response.data.choices[0].message);
  await setChatData([...chatData, {"role" : "assistant", "content" : response.data.choices[0].message.content}])
  setDisabled(false)
  try{
      div.remove()
  } catch (e) {console.log(e)}
  console.log(chatData)  
    return response.data.choices[0].message.content
  }
