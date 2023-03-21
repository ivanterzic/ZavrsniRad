const express = require('express');
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const model = "gpt-3.5-turbo"
const {OPENAI_API_KEY} = require('../data/openai_api_key')
const configuration = new Configuration({ apiKey: OPENAI_API_KEY, });
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
    console.log(req.body)
    chatData = req.body
    const response = await openai.createChatCompletion({
        model: model,
        messages: chatData,
        temperature : 0.8, //2 je too much, daje prerandom odgovore, 0.8 je okej
        //top_p : 1,
        //max_tokens : , 
        presence_penalty : 1.3,
        //frequency_penalty : 1
        })
    console.log(response.data.choices[0].message)
    res.send(response.data.choices[0].message);
});

module.exports = router