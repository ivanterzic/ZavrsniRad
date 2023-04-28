const express = require('express');
const router = express.Router();
const persona = require('../data/db')
const db = require('../db')

//returning a list of persona for the user to choose from
router.get("/", async (req, res) => {
    const sql = `SELECT personaId AS id, personaName AS name, personaGender AS gender, personaImageId AS imageid, personaInitialPrompt AS initialPrompt, personaVoice AS voice, personaCategoryId AS category, creatorUserName, originalPersona
    FROM persona`;
    try {
        const result = await db.query(sql, []);
        console.log(result.rows);
        res.json(persona);
    }
    catch (e) {
        console.log(e)
        res.status(429)
        res.send()
    }
});

module.exports = router