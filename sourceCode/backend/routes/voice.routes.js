const express = require('express');
const router = express.Router();
const axios = require('axios')
const {API_KEY} = require('../data/voice_api_key.js')
const {USER} = require('../data/voice_user.js')
const voiceRequest = require('../utils/axiosVoice')

router.get("/voices", async (req, res) => {
  try {
    response = await voiceRequest.get("https://play.ht/api/v1/getVoices")
    let returnArray = response.data.voices.filter((v) => 
      v.voiceType === "Standard"
    )
    res.send(returnArray)
  } 
  catch {
    res.statusCode(404)
  }
})

router.post("/", async (req, res) => { 
  const sendData = {
    "voice": req.body.voice,
    "content": req.body.content,
  }
  console.log(sendData)
  let response
  try {
    response = await voiceRequest.post("https://play.ht/api/v1/convert", sendData)
  } catch (error) {
    console.error(error);   
  }
  let audio = {
      "converted" : false
  }
  console.log(response)
  console.log(response.data)
  let transcriptionId = response.data.transcriptionId
  do {
      response = await voiceRequest.get("https://play.ht/api/v1/articleStatus?transcriptionId=" + transcriptionId )
      //console.log(response.data)
      audio = response.data  
  } while (!audio.converted)
  res.send(response.data.audioUrl)
});

module.exports = router