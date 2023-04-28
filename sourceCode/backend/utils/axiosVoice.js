const axios = require("axios")

const {API_KEY} = require('../data/voice_api_key.js')
const {USER} = require('../data/voice_user.js')

let voiceRequest = axios.create({
    headers: {
        "Authorization": API_KEY,
        "X-User-ID": USER,
        'Content-Type': 'application/json'
      }
    }
);

module.exports = voiceRequest;