const express = require('express');
const router = express.Router();
const db = require('../data/db')

router.post("/", async (req, res) => {
    try {
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
        

        const sql = `INSERT INTO persona (personaName, personaGender, personaImageId, personaInitialPrompt, personaVoice, personaCategoryId, creatorUserName VALUES( ${}, ${} )`;

        //TODO RIJESITI KAD RIJESIS LOGIN DA MOZES DODATI USERNAME

        try {
            const result = await db.query(sql, []);
            res.json(result.rows);
        }
        catch (e) {
            console.log(e)
            res.status(400)
            res.send()
        }

        res.status(200);
        res.send()
    }
    catch (e) {
        res.status(404)
        res.send()
    }
});

module.exports = router