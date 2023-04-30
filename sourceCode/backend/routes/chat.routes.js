const express = require('express');
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const model = "gpt-3.5-turbo"
const {OPENAI_API_KEY} = require('../data/openai_api_key')
const configuration = new Configuration({ apiKey: OPENAI_API_KEY, });
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
    chatData = req.body
    console.log(chatData)
    try {
        const response = await openai.createChatCompletion({
            model: model,
            messages: chatData,
            temperature : 0.8,
            presence_penalty : 1.3,
            })
        if(response.status == 429){
            console.log(response)
            res.status(429)
            res.send()
        }
        res.send(response.data.choices[0].message);
    }
    catch (e) {
        res.status(400)
        console.log(e)
        res.send()
    }
    
});

router.post("/withstop", async (req, res) => {

    chatData = req.body.chatData
    stop = req.body.stop


    let response
    try {
        response = await openai.createChatCompletion({
            model: model,
            messages: chatData,
            temperature : 0.8,
            presence_penalty : 1.3,
            stop : stop
            })
        if(response.status == 429){
            console.log(response)
            res.status(429)
            res.send()
        }
        res.send(response.data.choices[0].message);
    }
    catch (e) {
        res.status(400)
        //console.log(e)
        res.send()
    }
    
});

module.exports = router