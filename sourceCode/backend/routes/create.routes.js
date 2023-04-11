const express = require('express');
const router = express.Router();
const db = require('../data/db')

router.get("/",  (req, res) => {
    res.send("This route works")
})

router.post("/", async (req, res) => {
    console.log(req.body)
    data = req.body
    if (data.name.length === 0) {
        res.status(404)
        res.send()
    }
    if (data.voice === undefined || data.voice.length === 0) {
        res.status(404)
        res.send()
    }
    if (data.initialPrompt === undefined || data.initialPrompt.length === 0) {
        res.status(404)
        res.send()
    }

    if (data.imageid === undefined || data.imageid.length === 0) {
        res.status(404)
        res.send()
    }

    if (data.category === undefined || data.category.length === 0) {
        res.status(404)
        res.send()
    }

    db.push(data)

    res.status(200);
    res.send()
});

module.exports = router